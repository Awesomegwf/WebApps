//
// t_wndTopImplBase.h
//

#ifndef UI_WNDTOPIMPLBASE_INCLUDED
#define UI_WNDTOPIMPLBASE_INCLUDED

#include "t_wndBase.h"
#include "Platform.h"

namespace n_sgxx
{

class t_wndTop;

class t_wndTopImplBase
{
public:
	virtual ~t_wndTopImplBase() { }
	//delegate calls
	void SetDelegate(t_wndTop *p_pTop);
	t_wndTop * GetDelegate( );
	void OnPaint(t_hdc &p_hdc);
	void OnMouseMove(UInt32 nFlag, t_Point point);
	void OnMouseEnter();
	void OnMouseLeave();
	bool OnMouseHover(UInt32 nFlag, t_Point point);
	bool OnLButtonDbClk(UInt32 nFlag, t_Point point);
	bool OnLButtonDown(UInt32 nFlag, t_Point point);
	bool OnLButtonUp(UInt32 nFlag, t_Point point);
	bool OnRButtonDown(UInt32 nFlag, t_Point point);
	bool OnRButtonUp(UInt32 nFlag, t_Point point);
	bool OnTouch(e_Touchkey nFlag, t_Point point);
	bool OnLButtonLongPress(UInt32 nFlag, t_Point point); // ��ť����
	bool OnKeyDown(UInt32 nUnicode, UInt32 nKeyCode, bool bShiftDown, bool bCtrlDown, bool bAltDown, bool bCapsLock);
	bool OnKeyUp(UInt32 nUnicode, UInt32 nKeyCode, bool bShiftDown, bool bCtrlDown, bool bAltDown, bool bCapsLock);
	void OnMove(int x, int y);
	bool OnTimer(int p_nIDEvent);

	//plateform implementation
	virtual bool Create(int p_nStyle, int p_nX, int p_nY, int p_nWidth, int p_nHeight, t_wndTop *p_pParent) = 0;
	virtual void SetVisibled(bool p_bShow) = 0;
	virtual void Invalidate(const t_Rect& p_rc, bool bForce = false) = 0;
	virtual void ResizeWnd(int nWidth, int nHeight) = 0;
	virtual void MoveWnd(int p_nX, int p_nY) = 0;
	virtual int GetWndId() = 0;

private:
	t_wndTop *m_pTop;
};

} // namespace n_sgxx

#endif // UI_WNDTOPIMPLBASE_INCLUDED