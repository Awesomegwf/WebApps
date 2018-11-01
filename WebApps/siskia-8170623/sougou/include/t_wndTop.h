//
// t_wndTop.h
//

#ifndef UI_WNDTOP_INCLUDED
#define UI_WNDTOP_INCLUDED

#include "t_wndBase.h"
#include "Platform.h"

namespace n_sgxx
{

class t_wndTopImplBase;

class Keyboard_API t_wndTop : public t_wndBase
{
public:
	t_wndTop();
	~t_wndTop();

	virtual bool Create(int p_nStyle, int p_nX, int p_nY, int p_nWidth, int p_nHeight, t_wndTop *p_pParent);
	virtual void OnCreate() {};
	virtual void OnPaint(t_hdc &p_hdc);
	virtual void Show(bool p_bShow);
	//virtual bool PtIn(t_Point pt);
	virtual void OnMouseMove(UInt32 nFlag, t_Point point);
	virtual void OnMouseEnter();
	virtual void OnMouseLeave();
	virtual bool OnMouseHover(UInt32 nFlag, t_Point point);
	virtual bool OnLButtonDbClk(UInt32 nFlag, t_Point point);
	virtual bool OnLButtonDown(UInt32 nFlag, t_Point point);
	virtual bool OnLButtonUp(UInt32 nFlag, t_Point point);
	virtual bool OnRButtonDown(UInt32 nFlag, t_Point point);
	virtual bool OnRButtonUp(UInt32 nFlag, t_Point point);
	virtual bool OnTouch(e_Touchkey nFlag, t_Point point);
	virtual bool OnKeyDown(UInt32 nUnicode, UInt32 nKeyCode, bool bShiftDown, bool bCtrlDown, bool bAltDown, bool bCapsLock);
	virtual bool OnKeyUp(UInt32 nUnicode, UInt32 nKeyCode, bool bShiftDown, bool bCtrlDown, bool bAltDown, bool bCapsLock);
	virtual bool OnTimer(int p_nIDEvent);
	virtual int GetWndId();

	virtual void Invalidate(const t_Rect& p_rc, bool bForce = false);
	virtual void ResizeWnd(int nWidth, int nHeight);
	virtual void MoveWnd(int p_nX, int p_nY);

	void SetBkColor(const Color& p_clrBk);
	void SetBkImg(const char* p_szBkImg);
	t_wndTopImplBase* PlatformWndTop() const;

protected:
	t_wndTopImplBase *m_pImpl;
	t_wndTop *m_pParent;
	Color m_clrBk;
	t_image *m_pImgBk;
	int m_nXWnd; // 窗口里屏幕的坐标
	int m_nYWnd;
};

t_wndTopImplBase *GetPlatformWndTop(t_wndTop *p_pDelegate);

} // namespace n_sgxx

#endif // UI_WNDTOP_INCLUDED