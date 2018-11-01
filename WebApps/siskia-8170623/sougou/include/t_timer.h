//
// t_timer.h
//

#ifndef	UI_TIMER_INCLUDED
#define UI_TIMER_INCLUDED

#include "UI.h"

//#if defined(SGXX_OS_FAMILY_WINDOWS)
//#include "../platform/Win32/Include/t_timerWin32.h"
//#elif defined(SGXX_OS_FAMILY_ANDRIOD)
//#include "../platform/Android/Include/t_timerAndroid.h"
//#elif defined(SGXX_OS_FAMILY_UNIX)
//#include "../platform/Linux/Include/t_timerLinux.h"
//#else
//#endif

namespace n_sgxx {

//typedef void (*TIMERPROC)(int p_nIDEvent);

class t_timerBase
{
public:
	virtual ~t_timerBase() {}
	virtual bool SetTimer(int p_nIDEvent, UINT p_uElapse, int p_nWndId) = 0;
	virtual bool KillTimer(int p_nIDEvent, int p_nWndId) = 0;
};

class Keyboard_API t_timer : public t_timerBase
{
public:
	t_timer();
	~t_timer();

	// t_timerBase
	virtual bool SetTimer(int p_nIDEvent, UINT p_uElapse, int p_nWndId);
	virtual bool KillTimer(int p_nIDEvent, int p_nWndId);

	t_timerBase* PlatformTimer() const;

private:
	t_timerBase *m_pImpl;
};

t_timerBase *GetPlatformTimer();

} // namespace n_sgxx

#endif // UI_TIMER_INCLUDED