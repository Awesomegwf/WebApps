//
//	platform.h
//	Platform and architecture identification macros.
//

#ifndef UI_PLATFORM_INCLUDED 
#define UI_PLATFORM_INCLUDED

#define SGXX_OS_FREE_BSD      0x0001
#define SGXX_OS_AIX           0x0002
#define SGXX_OS_HPUX          0x0003
#define SGXX_OS_TRU64         0x0004
#define SGXX_OS_LINUX         0x0005
#define SGXX_OS_MAC_OS_X      0x0006
#define SGXX_OS_NET_BSD       0x0007
#define SGXX_OS_OPEN_BSD      0x0008
#define SGXX_OS_IRIX          0x0009
#define SGXX_OS_SOLARIS       0x000a
#define SGXX_OS_QNX           0x000b
#define SGXX_OS_VXWORKS       0x000c
#define SGXX_OS_CYGWIN        0x000d
#define SGXX_OS_NACL	      0x000e
#define SGXX_OS_UNKNOWN_UNIX  0x00ff
#define SGXX_OS_WINDOWS_NT    0x1001
#define SGXX_OS_WINDOWS_CE    0x1011
#define SGXX_OS_VMS           0x2001
#define SGXX_OS_ANDORID       0x2002

#if defined(linux) || defined(__linux) || defined(__linux__) || defined(__TOS_LINUX__) || defined(EMSCRIPTEN)
#define SGXX_OS_FAMILY_UNIX 1
#define SGXX_OS SGXX_OS_LINUX
#elif defined(unix) || defined(__unix) || defined(__unix__)
#define SGXX_OS_FAMILY_UNIX 1
#define SGXX_OS SGXX_OS_UNKNOWN_UNIX
#elif defined(_WIN32_WCE)
#define SGXX_OS_FAMILY_WINDOWS 1
#define SGXX_OS SGXX_OS_WINDOWS_CE
#elif defined(_WIN32) || defined(_WIN64)
#define SGXX_OS_FAMILY_WINDOWS 1
#define SGXX_OS SGXX_OS_WINDOWS_NT
#elif defined(ANDROID) || defined(__ANDROID__)
#define SGXX_OS_FAMILY_ANDRIOD 1
#define SGXX_OS SGXX_OS_ANDORID
#endif

#endif // UI_PLATFORM_INCLUDED