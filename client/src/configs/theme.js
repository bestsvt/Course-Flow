import { extendTheme } from '@chakra-ui/react'

const colors = {
    blue: {
      900: '#020D1E',
      800: '#0C182B',
      700: '#183056',
      600: '#234781',
      500: '#2F5FAC',
      400: '#5483D0',
      300: '#8DADE0',
      200: '#C6D6EF',
      100: '#E5ECF8',
    },
    gray: {
      900: '#2A2E3F',
      800: '#424C6B',
      700: '#646D89',
      600: '#9AA1B9',
      500: '#C8CCDB',
      400: '#D6D9E4',
      300: '#E4E6ED',
      200: '#F1F2F6',
      100: '#F6F7FC',
    },
    orange: {
      100: '#FBAA1C',
      500: '#F47E20',
    },
    black: '#000000',
    white: '#FFFFFF',
    green: '#2FAC8E',
    linear1: 'linear-gradient(90deg, #95BEFF, #0040E5)',
    linear2: 'linear-gradient(90deg, #5697FF, #2558DD)'
  }

const shadows = {
    shadow1: "4px 4px 24px rgba(0, 0, 0, 0.08)",
    shadow2: "2px 2px 12px rgba(64, 50, 133, 0.12)",
  };

const components = { 
  Button: {variants: {
    primary: {
      bg: "blue.500",
      color: "white",
      boxShadow: "shadow1",
      borderRadius: "12px",
      height: "60px",
      fontSizes: "16px",
      fontWeight: 700,
      padding: "18px 32px",
      _hover: {
        bg: "blue.400",
        _disabled: {
          color: "gray.600",
          bg: "gray.400",
          opacity: 1,
        },
      },
      _active: {
        bg: "blue.700",
      },
      _disabled: {
        color: "gray.600",
        bg: "gray.400",
        opacity: 1,
      },
    },
    secondary:{
      bg: "white",
      color: "orange.500",
      boxShadow: "shadow1",
      border: '1px solid',
      borderRadius: "12px",
      height: "60px",
      fontSizes: "16px",
      fontWeight: 700,
      padding: "18px 32px",
      _hover: {
        color: "orange.100",
        _disabled: {
          color: "gray.600",
          bg: "gray.400",
          opacity: 1,
        },
      },
      _active: {
        color: "orange.500",
      },
      _disabled: {
        color: "gray.500",
        opacity: 1,
      },
    },
    draft:{
      bg: "white",
      color: "blue.500",
      boxShadow: "shadow1",
      border: '1px solid',
      borderRadius: "12px",
      height: "60px",
      fontSizes: "16px",
      fontWeight: 700,
      padding: "18px 32px",
      _hover: {
        color: "blue.100",
        _disabled: {
          color: "gray.600",
          bg: "gray.400",
          opacity: 1,
        },
      },
      _active: {
        color: "blue.500",
      },
      _disabled: {
        color: "gray.500",
        opacity: 1,
      },
    }
  }},

  Input: {variants:{
    normal: {
      field: {
        height: '48px',
        p: '12px 16px 12px 12px',
        border: '1px solid',
        borderColor: 'gray.400',
        bg: 'white',
        color: 'black',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '400',
      _focus: {
        borderColor: 'orange.500'
      },
      _disabled: {
        bg: 'gray.200',
        color: 'gray.600'
      },
      _invalid: {
        borderColor: '#9B2FAC',
        backgroundImage: "url('./image/icon/exclamation-warning.png')",
        backgroundPosition: "96%",
        backgroundRepeat: "no-repeat",
      },
      _placeholder: { opacity: "1", color: 'gray.500' }
      }
    },
    password: {
      field: {
        height: '48px',
        p: '12px 16px 12px 12px',
        border: '1px solid',
        borderColor: 'gray.400',
        bg: 'white',
        color: 'black',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '400',
      _focus: {
        borderColor: 'orange.500'
      },
      _disabled: {
        bg: 'gray.200',
        color: 'gray.600'
      },
      _invalid: {
        borderColor: '#9B2FAC',
        backgroundImage: "url('./image/icon/exclamation-warning.png')",
        backgroundPosition: "82%",
        backgroundRepeat: "no-repeat",
      },
      _placeholder: { opacity: "1", color: 'gray.500' }
      }
    },
    date: {
      field: {
        height: '48px',
        p: '12px 16px 12px 12px',
        border: '1px solid',
        borderColor: 'gray.400',
        bg: 'white',
        color: 'black',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '400',
      _focus: {
        borderColor: 'orange.500'
      },
      _disabled: {
        bg: 'gray.200',
        color: 'gray.600'
      },
      _invalid: {
        borderColor: '#9B2FAC',
        backgroundImage: "url('./image/icon/exclamation-warning.png')",
        backgroundPosition: "90%",
        backgroundRepeat: "no-repeat",
      },
      _placeholder: { opacity: "1", color: 'gray.500' }
      }
    }
  }
  },
  Link: {
    variants: {
      default: {
        fontSize: "16px",
        lineHeight: '24px',
        fontWeight: 700,
        color: "blue.500",
        _hover: {
          color: "blue.400",
          textDecoration: "none",
        },
        _active: {
          color: "blue.600",
        },
        _disabled: {
          color: "gray.500",
        },
      },
    },
    defaultProps: {
      variant: "default",
    },
  },
  Progress: {
    baseStyle: {
      filledTrack: {
        bg: 'linear-gradient(90deg, #5697FF, #2558DD)',
      },
    }
  },
  Badge: {
    variants: {
      submitted: {
        color: "#0A7B60",
        backgroundColor: "#DDF9EF",
        fontSize: "14px",
        fontWight: 500,
        lineHeight: "150%",
        padding: "4px 8px 4px 8px",
        borderRadius: "6px",
        textTransform: "capitalize",
      },
      overdue: {
        color: "#9B2FAC",
        backgroundColor: "#FAE7F4",
        fontSize: "14px",
        fontWight: 500,
        lineHeight: "150%",
        padding: "4px 8px 4px 8px",
        borderRadius: "6px",
        textTransform: "capitalize",
      },
      pending: {
        color: "#996500",
        backgroundColor: "#FFFBDB",
        fontSize: "14px",
        fontWight: 500,
        padding: "4px 8px 4px 8px",
        borderRadius: "6px",
        textTransform: "capitalize"
      },
      inProgress : {
        color: "#3557CF",
        backgroundColor: "#D2DCFF",
        fontSize: "14px",
        fontWight: 500,
        lineHeight: "150%",
        padding: "4px 8px 4px 8px",
        borderRadius: "6px",
        textTransform: "capitalize",
      },
      'submitted late' : {
        color: "#F1D3BB",
        backgroundColor: "#A12830",
        fontSize: "14px",
        fontWight: 500,
        lineHeight: "150%",
        padding: "4px 8px 4px 8px",
        borderRadius: "6px",
        textTransform: "capitalize",
      },
    },
  },
  Textarea: {
    variants: {
      normal: {
        height: '48px',
        p: '12px 16px 12px 12px',
        border: '1px solid',
        borderColor: 'gray.400',
        bg: 'white',
        color: 'black',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '400',
        _focus: {
          borderColor: 'orange.500'
        },
        _disabled: {
          bg: 'gray.200',
          color: 'gray.600'
        },
        _invalid: {
          borderColor: '#9B2FAC',
          backgroundImage: "url('./image/icon/exclamation-warning.png')",
          backgroundPosition: "96%",
          backgroundRepeat: "no-repeat",
        },
        _placeholder: { opacity: "1", color: 'gray.500' }
      }
    }

  } 
}
  
const theme = extendTheme({ colors , components, shadows })

export default theme
  