//
// UI.h
//

#ifndef UI_UI_INCLUDED
#define UI_UI_INCLUDED

//
// Include library configuration
//
//#include "Config.h"

//
// Pull in basic definitions
//

#include <string>
#include <string.h>
#include <stdlib.h>
#include "Types.h"

//
// Ensure that SGXX_DLL is default unless SGXX_STATIC is defined
//
#if defined(_WIN32) && defined(_DLL)
#if !defined(SGXX_DLL) && !defined(SGXX_STATIC)
#define SGXX_DLL
#endif
#endif


//
// The following block is the standard way of creating macros which make exporting 
// from a DLL simpler. All files within this DLL are compiled with the SGKEYBOARD_EXPORTS
// symbol defined on the command line. this symbol should not be defined on any project
// that uses this DLL. This way any other project whose source files include this file see 
// Keyboard_API functions as being imported from a DLL, wheras this DLL sees symbols
// defined with this macro as being exported.
//
#if (defined(_WIN32) || defined(_WIN32_WCE))
#if defined(SGXX_DLL)
#define Keyboard_API __declspec(dllexport)
#else
#define Keyboard_API __declspec(dllimport)	
#endif
#endif


#if !defined(Keyboard_API)
#if !defined(SGXX_NO_GCC_API_ATTRIBUTE) && defined (__GNUC__) && (__GNUC__ >= 4)
#define Keyboard_API __attribute__ ((visibility ("default")))
#else
#define Keyboard_API
#endif
#endif

#ifdef Keyboard_API
#undef Keyboard_API
#define Keyboard_API
#endif


//
// Automatically link Keyboard library.
//
#if defined(_MSC_VER)
//#if defined(SGXX_DLL)
//#if defined(_DEBUG)
//#define SGXX_LIB_SUFFIX "d.lib"
//#else
#define SGXX_LIB_SUFFIX ".lib"
//#endif
//#elif defined(_DLL)
//#if defined(_DEBUG)
//#define SGXX_LIB_SUFFIX "mdd.lib"
//#else
//#define SGXX_LIB_SUFFIX "md.lib"
//#endif
//#else
//#if defined(_DEBUG)
//#define SGXX_LIB_SUFFIX "mtd.lib"
//#else
//#define SGXX_LIB_SUFFIX "mt.lib"
//#endif
//#endif

#if !defined(SGXX_NO_AUTOMATIC_LIBS) && !defined(SGKEYBOARD_EXPORTS)
#pragma comment(lib, "SGKeyboard" SGXX_LIB_SUFFIX)
#endif
#endif


//
// Include platform-specific definitions
//
#include "Platform.h"
//#if defined(_WIN32)
//#include "../platform/Win32/Include/platformWin32.h"
//#elif defined(SGXX_OS_FAMILY_ANDRIOD)
//#include "../platform/Android/Include/platformAndroid.h"
//#elif defined(SGXX_OS_FAMILY_UNIX)
//#include "../platform/Linux/Include/platformLinux.h"
//#else
//#endif


//
// Cleanup inconsistencies
//
#ifdef SGXX_OS_FAMILY_WINDOWS
#if defined(SGXX_WIN32_UTF8) && defined(SGXX_NO_WSTRING)
#error SGXX_WIN32_UTF8 and SGXX_NO_WSTRING are mutually exclusive.
#endif
#else
#ifdef SGXX_WIN32_UTF8
#undef SGXX_WIN32_UTF8
#endif
#endif


//
// SGXX_JOIN
//
// The following piece of macro magic joins the two
// arguments together, even when one of the arguments is
// itself a macro (see 16.3.1 in C++ standard).  The key
// is that macro expansion of macro arguments does not
// occur in SGXX_DO_JOIN2 but does in SGXX_DO_JOIN.
//
#define SGXX_JOIN(X, Y) SGXX_DO_JOIN(X, Y)
#define SGXX_DO_JOIN(X, Y) SGXX_DO_JOIN2(X, Y)
#define SGXX_DO_JOIN2(X, Y) X##Y


#endif // UI_UI_INCLUDED
