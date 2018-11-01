
#include "t_wndPopUpSkia.h"
#include "t_hdcSkia.h"
#include "t_wndTopImplBase.h"


namespace n_sgxx
{
	t_wndPopUpSkia::t_wndPopUpSkia()
	{

	}

	bool t_wndPopUpSkia::Create(int p_nStyle, int p_nX, int p_nY, int p_nWidth, int p_nHeight, t_wndTop *p_pParent)
	{
		return true;
	}

	t_wndTopImplBase *GetPlatformWndPopup(t_wndPopup *p_pDelegate)
	{
    	t_wndPopUpSkia *pTop = new t_wndPopUpSkia;
    	pTop->SetDelegate(p_pDelegate);
    	return pTop;
	}

} //namespace end