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
      .order("created_at", { ascending: true });

    const { data: allCoursesWithPage } = await supabase
      .from("getallcourses")
      .select()
      .ilike("name", `%${keyword}%`)
      .order("created_at", { ascending: true })
      .range(offset, offset + itemsPerPage - 1);

    return res.json({
      data: allCoursesWithPage,
      allCourses,
    });
  } catch (error) {
    console.log("Get all courses error:", error);
  }
}

async function deleteCourse(req, res) {
  const courseId = req.params.courseId;

  try {
    await supabase
      .from('courses')
      .delete()
      .eq('course_id', courseId)

    console.log("Deleted Success");

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

  try {
    return res.json({
      message: "Course updated successfully!",
    });
  } catch (error) {
    console.log("Update course error:", error);
  }
}

export { getAllCourses, deleteCourse, updateCourse, createCourse };
