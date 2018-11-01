//
// Utils.h
//

#ifndef UI_UTILS_INCLUDED
#define UI_UTILS_INCLUDED

#include "UI.h"
#include <vector>
#include <string>

namespace n_sgxx
{
	typedef struct _Color
	{
		uchar b;
		uchar g;
		uchar r;
		uchar a;
	}Color;

	Color MakeColor(uchar r, uchar g, uchar b, uchar a = 255);
	Color MakeColor(int nClr);
	#define MAKECOLORREF(Color) (((DWORD)(Color.b)<<16) | ((DWORD)(Color.g)<<8) | (DWORD)Color.r)
	#define MAKEARGB(Color) (((DWORD)(Color.a)<<24) | ((DWORD)(Color.r)<<16) | ((DWORD)(Color.g)<<8) | (DWORD)Color.b)

	void MbsToWcs(const char *CStr, wchar_t **WStr);
	void WcsToMbs(const wchar_t *WStr, char **CStr);
	char* WcsToMbs(const wchar_t *WStr);
	wchar_t* MbsToWcs(const char *CStr);
	//wchar_t* UTF8ToWChar(const char *src);
	//char* Utf8ToMbs(const char *str);
	char *MByteToUTF8(const char *p_szString);

	void SplitString(const std::string& s, std::vector<std::string>& v, const std::string& c);

	/////////////////////////////////////////////////////////////////////////////////////
	//
	class Keyboard_API t_Point
	{
	public:
		t_Point();
		t_Point(const t_Point& src);
		t_Point(int x, int y);
		t_Point(int nlParam);

	public:
		long x;
		long y;
	};


	/////////////////////////////////////////////////////////////////////////////////////
	//

	class t_Rect;
	class Keyboard_API t_Size
	{
	public:
		t_Size();
		t_Size(const t_Size& src);
		t_Size(const t_Rect& rc);
		t_Size(int cx, int cy);
	public:
		long cx;
		long cy;
	};


	/////////////////////////////////////////////////////////////////////////////////////
	//

	class Keyboard_API t_Rect
	{
	public:
		t_Rect();
		t_Rect(const t_Rect& src);
		t_Rect(int iLeft, int iTop, int iRight, int iBottom);

		int GetWidth() const;
		int GetHeight() const;
		void Empty();
		bool IsNull() const;
		void Join(const t_Rect& rc);
		void Intersect(const t_Rect& rc);
		void Offset(int x, int y);
		void Normalize();

	public:
		long left;
		long top;
		long right;
		long bottom;
	};

}// namespace n_sgxx

#endif // UI_UTILS_INCLUDED