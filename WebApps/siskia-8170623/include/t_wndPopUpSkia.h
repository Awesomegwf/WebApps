#ifndef T_WNDPOPUPSKIA_H
#define T_WNDPOPUPSKIA_H

#include "t_wndPopUp.h"
#include "t_wndTop.h"
#include "t_wndTopSkia.h"
#include "t_timerSkia.h"

namespace n_sgxx
{

class t_wndPopUpSkia : public t_wndTopSkia
{
public:
    t_wndPopUpSkia();
	// t_wndTopImplBase
	virtual bool Create(int p_nStyle, int p_nX, int p_nY, int p_nWidth, int p_nHeight, t_wndTop *p_pParent);
private:

};

} // namespace n_sgxx


#endif