//
// t_wndPopup.h
//

#ifndef UI_WNDPOPUP_INCLUDED
#define UI_WNDPOPUP_INCLUDED

#include "Platform.h"
#include "t_wndTop.h"

namespace n_sgxx
{

	class t_wndPopup : public t_wndTop
	{
	public:
		t_wndPopup();
		~t_wndPopup();

		virtual void OnPaint(t_hdc &p_hdc);

	protected:
		
	};

	t_wndTopImplBase *GetPlatformWndPopup(t_wndPopup *p_pDelegate);

} // namespace n_sgxx

#endif // UI_WNDPOPUP_INCLUDED