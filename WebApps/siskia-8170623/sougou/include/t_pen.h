//
// t_pen.h
//

#ifndef	UI_PEN_INCLUDED
#define UI_PEN_INCLUDED

#include "UI.h"
#include "Utils.h"

//#if defined(SGXX_OS_FAMILY_WINDOWS)
//#include "../platform/Win32/Include/t_penWin32.h"
//#elif defined(SGXX_OS_FAMILY_ANDRIOD)
//#include "../platform/Android/Include/t_penAndroid.h"
//#elif defined(SGXX_OS_FAMILY_UNIX)
//#include "../platform/Linux/Include/t_penLinux.h"
//#else
//#endif

namespace n_sgxx {

class t_penBase
{
public:
	virtual ~t_penBase() {}
	virtual bool Create(int p_nStyle, int p_nWidth, Color p_clr) = 0;
	virtual bool Destroy() = 0;
};

class Keyboard_API t_pen : public t_penBase
{
public:
	t_pen();
	t_pen(const t_pen& p_pen);
	~t_pen();

	t_pen& operator=(const t_pen& p_pen);

	// t_penBase
	virtual bool Create(int p_nStyle, int p_nWidth, Color p_clr);
	virtual bool Destroy();

	// get method
	int Style() const ;
	int Width() const ;
	Color color() const ;
	t_penBase* PlatformPen() const;

private:
	t_penBase *m_pImpl;
	int m_nStyle;
	int m_nWidth;
	Color m_clr;
};

t_penBase *GetPlatformPen();

} // namespace n_sgxx

#endif // UI_PEN_INCLUDED
