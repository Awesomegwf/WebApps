#include "t_timerSkia.h"
#include <iostream>
using namespace std;

namespace n_sgxx
{
	t_timerSkia::t_timerSkia()
	{
//		cout<<"t_timerSkia constructor"<<endl;
	}
    t_timerSkia::~t_timerSkia()
    {	
//    	cout<<"t_timerSkia destructor"<<endl;
    }
    bool t_timerSkia::SetTimer(int p_nIDEvent, UINT p_uElapse,int p_nWndId)
    {
    	return true;
    }
    bool t_timerSkia::KillTimer(int p_nIDEvent,int p_nWndId)
    {
    	return true;
    }

    t_timerBase *GetPlatformTimer()
	{
    	return new t_timerSkia();
	}

}// namespace end
