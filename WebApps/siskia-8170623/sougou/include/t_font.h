//
// t_font.h
//

#ifndef	UI_FONT_INCLUDED
#define UI_FONT_INCLUDED

#include "UI.h"

//#if defined(SGXX_OS_FAMILY_WINDOWS)
//#include "../platform/Win32/Include/t_fontWin32.h"
//#elif defined(SGXX_OS_FAMILY_ANDRIOD)
//#include "../platform/Android/Include/t_fontAndroid.h"
//#elif defined(SGXX_OS_FAMILY_UNIX)
//#include "../platform/Linux/Include/t_fontLinux.h"
//#else
//#endif

namespace n_sgxx {

class t_fontBase
{
public:
	virtual ~t_fontBase() {}
	virtual bool Create(char *p_szFamily, int p_nSize, bool p_bBold = false, bool p_bItalic = false, bool p_bUnderline = false) = 0;
	virtual bool Destroy() = 0;
};

class Keyboard_API t_font : public t_fontBase
{
public:
	t_font();
	t_font(char *p_szFamily, int p_nSize, bool p_bBold = false, bool p_bItalic = false, bool p_bUnderline = false);
	t_font(const t_font& p_font);
	~t_font();

	t_font& operator=(const t_font& p_font);

	// t_fontBase
	virtual bool Create(char *p_szFamily, int p_nSize, bool p_bBold = false, bool p_bItalic = false, bool p_bUnderline = false);
	virtual bool Destroy();

	bool Create();
	// set method
	void SetFamily(const char* p_szFamily);
	void SetSize(int p_nSize) { m_nSize = p_nSize; }
	void SetBold(bool p_bBold) { m_bBold = p_bBold; }
	void SetItalic(bool p_bItalic) { m_bItalic = p_bItalic; }
	void SetUnderline(bool p_bUnderline) { m_bUnderline = p_bUnderline; }

	// get method
	const char* Family() const ;
	int Size() const ;
	bool Bold() const ;
	bool Italic() const ;
	bool Underline() const ;
	t_fontBase* PlatformFont() const;

private:
	t_fontBase *m_pImpl;
	char m_szFamily[32];
	int m_nSize;
	bool m_bBold;
	bool m_bItalic;
	bool m_bUnderline;
};

t_fontBase *GetPlatformFont();

} // namespace n_sgxx

#endif // UI_FONT_INCLUDED