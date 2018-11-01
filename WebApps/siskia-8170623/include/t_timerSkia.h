#ifndef T_TIMERSKIA_H
#define T_TIMERSKIA_H

#include "t_timer.h"
namespace n_sgxx
{
	class t_timerSkia : public t_timerBase
    {
    public:
        t_timerSkia();
        ~t_timerSkia();
        virtual bool SetTimer(int p_nIDEvent, UINT p_uElapse,int p_nWndId=0/*, TIMERPROC lpTimerFunc*/);
        virtual bool KillTimer(int p_nIDEvent,int p_nWndId=0);
    private:
    };
} //namespace end

#endif