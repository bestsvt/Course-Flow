import { supabase } from "../utils/db.js";
import { cloudinaryUpload } from "../utils/upload.js";

async function getAllCourses(req, res) {
  const keyword = req.query.keyword;
  const currentPage = req.query.currentPage;
  const itemsPerPage = 8;
  const offset = (currentPage - 1) * itemsPerPage;

  try {
    const { data: allCourses } = await supabase
      .from("getallcourses")
      .select()
      .ilike("name", `%${keyword}%`)
      .order("created_at", { ascending: false });

    const { data: allCoursesWithPage } = await supabase
      .from("getallcourses")
      .select()
      .ilike("name", `%${keyword}%`)
      .order("created_at", { ascending: false })
      .range(offset, offset + itemsPerPage - 1);

    return res.json({
      data: allCoursesWithPage,
      allCourses,
    });
  } catch (error) {
    console.log("Get all courses error:", error);
  }
}

async function getCoursesById(req, res) {
  const courseId = req.params.courseId;
 
  try {
    const { data: CoursesById } = await supabase
    .from("courses")
    .select("* , lessons (* , sub_lessons(*, users_sub_lessons(*)))")
    .eq("course_id", courseId)
    .order("lesson_id", { foreignTable: "lessons", ascending: true });

    return res.json({
      data: CoursesById
    });
  } catch (error) {
    console.log("Get courses by id error:", error);
  }
}

async function getLessonById(req, res) {
  const lessonId = req.params.lessonId
 
  try {
    const { data: lessonById } = await supabase
      .from("lessons")
      .select("* , sub_lessons (*)")
      .eq("lesson_id", lessonId)
      .order("sub_lesson_id", { foreignTable: "sub_lessons", ascending: true });

    return res.json({
      data: lessonById
    });
  } catch (error) {
    console.log("Get courses by id error:", error);
  }
}

async function deleteCourse(req, res) {
  const courseId = req.params.courseId;

  try {

    let dataForDelete = []
    const { data: courseData } = await supabase
      .from("courses")
      .select("image_cover , video_trailer")
      .eq("course_id", courseId)

    for (const file of Object.values(courseData[0])) {
      dataForDelete.push(file)
    }

    const { data: subLessonData } = await supabase
      .from("courses")
      .select("* , lessons (* , sub_lessons(*, users_sub_lessons(*)))")
      .eq("course_id", courseId)

    for (let i = 0; i < subLessonData[0].lessons.length; i++) {
      for (let j = 0; j < subLessonData[0].lessons[i].sub_lessons.length; j++) {
        dataForDelete.push(subLessonData[0].lessons[i].sub_lessons[j].video)
      }
    }

    for (let file of dataForDelete) {
      await cloudinaryUpload(file, "delete", undefined, file.resource_type);
    }

    await supabase.from("courses").delete().eq("course_id", courseId);

    return res.json({
      message: "Course deleted successfully!",
    });
  } catch (error) {
    console.log("Delete course error:", error);
  }
}

async function createCourse(req, res) {
  try {
    let createCourse = {
      name: req.body.course_name,
      course_detail: req.body.course_detail,
      category: req.body.category,
      price: req.body.price,
      total_learning_time: req.body.learning_time,
      course_summary: req.body.summary,
      created_at: new Date(),
      update_at: new Date(),
    };
    createCourse.image_cover = await cloudinaryUpload(
      ...req.files.cover_image_file,
      "upload",
      "cover_image_course"
    );
    createCourse.video_trailer = await cloudinaryUpload(
      ...req.files.video_file,
      "upload",
      "video_trailer_course"
    );

    await supabase.from("courses").insert(createCourse);

    const { data: course } = await supabase
      .from("courses")
      .select()
      .order("course_id", { ascending: false })
      .limit(1);

    const courseId = course[0].course_id;
    const lesson = req.body.lesson;
    const subLessonVideos = req.files.sub_lesson_videos;

    for (let i = 0; i < lesson.length; i++) {
      await supabase
        .from("lessons")
        .insert({ course_id: courseId, name: lesson[i].lesson_name });
      const { data: lessonData } = await supabase
        .from("lessons")
        .select()
        .order("lesson_id", { ascending: false })
        .limit(1);
      let lessonId = lessonData[0].lesson_id;

      for (let j = 0; j < lesson[i].sub_lesson.length; j++) {
        let videoFile;
        for (let k = 0; k < subLessonVideos.length; k++) {
          if (
            subLessonVideos[k].originalname ==
            lesson[i].sub_lesson[j].sub_lesson_name
          ) {
            videoFile = subLessonVideos[k];
          }
        }

        let createSubLesson = {
          lesson_id: lessonId,
          name: lesson[i].sub_lesson[j].sub_lesson_name,
        };

        createSubLesson.video = await cloudinaryUpload(
          videoFile,
          "upload",
          "sub_lesson_video"
        );

        //เหลือเอาไฟล์จาก sub lesson ขึ้น cloudinary ตอน insert
        //รอสร้างเงื่อนไขจาก FE ไม่ให้สร้าง ชื่อ sub lesson ซ้ำกันภายในคอส
        await supabase.from("sub_lessons").insert(createSubLesson);
      }
    }

    return res.json({
      message: "Course Created successfully!",
    });
  } catch (error) {
    console.log("Create course error:", error);
  }
}

async function updateCourse(req, res) {
  const courseId = req.params.courseId;
  const coverImage = req.files.cover_image_file
  const videoTrailer = req.files.video_file

  try {

    const { data: courseData } = await supabase
    .from("courses")
    .select()
    .eq("course_id", courseId)

    let updateCourse = {
      name: req.body.course_name,
      course_detail: req.body.course_detail,
      category: req.body.category,
      price: req.body.price,
      total_learning_time: req.body.learning_time,
      course_summary: req.body.summary,
      update_at: new Date(),
    };

    // Check have new image file or not
    if (coverImage) {
      // Remove previous cover image from cloudinary
      let previousCoverImage = courseData[0].image_cover
      await cloudinaryUpload(previousCoverImage, "delete", undefined, previousCoverImage.resource_type);

      // Upload new cover image to cloudinary
      updateCourse.image_cover = await cloudinaryUpload(
        ...req.files.cover_image_file,
        "upload",
        "cover_image_course"
      );
    }

    // Check have new video file or not
    if (videoTrailer) {
      // Remove previous video from cloudinary
      let previousVideoTrailer = courseData[0].video_trailer
      await cloudinaryUpload(previousVideoTrailer, "delete", undefined, previousVideoTrailer.resource_type);

      // Upload new video to cloudinary
      updateCourse.video_trailer = await cloudinaryUpload(
        ...req.files.video_file,
        "upload",
        "video_trailer_course"
      );
    }

    await supabase
      .from("courses")
      .update(updateCourse)
      .eq("course_id", courseId)

    return res.json({
      message: "Course updated successfully!",
    });
  } catch (error) {
    console.log("Update course error:", error);
  }
}

export {
  getAllCourses,
  deleteCourse,
  updateCourse,
  createCourse,
  getCoursesById,
  getLessonById
};
