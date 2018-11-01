//
// t_wndBase.h
//

#ifndef UI_WNDBASE_INCLUDED
#define UI_WNDBASE_INCLUDED

#include "Utils.h"
#include "UI.h"
#include "t_hdc.h"
#include <vector>

namespace n_sgxx
{
	class t_wndTop;

	enum e_Touchkey
	{
		ecTouchKeyDown = 0,
		ecTouchKeyUp,
		ecTouchKeyMove,
	};

class Keyboard_API t_wndBase
{
public:
	t_wndBase(void);
	virtual ~t_wndBase(void);

	/*消息处理函数*/
	/*!
	 \return true: 消息被处理,false: 消息未处理
	 */
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
	virtual bool OnLButtonLongPress(UInt32 nFlag, t_Point point);
	virtual bool OnKeyDown(UInt32 nUnicode, UInt32 nKeyCode, bool bShiftDown, bool bCtrlDown, bool bAltDown, bool bCapsLock);
	virtual bool OnKeyUp(UInt32 nUnicode, UInt32 nKeyCode, bool bShiftDown, bool bCtrlDown, bool bAltDown, bool bCapsLock);
	virtual void OnPaint(t_hdc &hdcex);
	virtual void OnMove(int x, int y);
	virtual void MoveDiff(int dx, int dy);
	virtual void OnSize(int cx, int cy);
	virtual bool Create(int p_nX, int p_nY, int p_nWidth, int p_nHeight, t_wndBase *p_pParent);
	virtual bool DoCommand(int p_nKey, bool p_bKeyDown);
	virtual bool OnTimer(int p_nIDEvent);
	virtual int GetWndId();

	int GetX() const;
	int GetY() const;
	virtual int GetWidth() const;
	virtual int GetHeight() const;
	bool AddChild(t_wndBase *pWndChild);
	bool RemoveChild(t_wndBase *pWndChild);
	int GetChildCnt();
	void SetParent(t_wndBase* pWndParent);
	t_wndBase* GetParent(void) const;
	t_wndTop* GetWndTop();
	void SetTopWnd(t_wndTop* pWndTop);
	void Resize(t_Size p_Size);
	void Resize(int p_nWidth, int p_nHeihgt);

	void GetClientRect(t_Rect *lpRect);
	void GetWindowRect(t_Rect *lpRect);
	void GetChildRect(t_Rect *lpRect);
	void GetTopRect(t_Rect *lpRect);
	void GetPaintOrg(t_Point *pPt);
	void GetPaintRect(t_Rect *lpRect);
	void GetPtInTop(t_Point *lpPoint); /* in, out */
	void GetPtInClient(t_Point *lpPoint); /* in, out */
	void GetSize(t_Size *lpSize);
	t_wndBase* GetChild(int p_nIdx);
	virtual void Move(int X, int Y, int nWidth, int nHeight, bool bRepaint);
	virtual bool Move(int p_nX, int p_nY);
	virtual void Invalidate(const t_Rect& p_rc, bool bForce = false);
	virtual void SetVisible(bool bVisibled = true);
	virtual bool IsVisible();
	virtual void SetEnable(bool bEnable = true);
	virtual bool IsEnable();
	virtual bool PtIn(t_Point pt);

	void SetText(const char *p_szText);
	const char* GetText() const;
	void SetName(const char* p_szName);
	std::string GetName();
	t_wndBase* FindChildByName(const char *p_szName);
	bool SupportNoHoldClick() const { return m_bSupportNoHoldClick; }
	void ClearPushedState();

public:
	static t_wndBase *s_pHold;

protected:
	bool PtInRect(t_Rect *lprc, t_Point pt);

protected:
	bool m_bVisible;
	bool m_bEnable;
	std::vector<t_wndBase*> m_aWnds;
	t_wndBase* m_pWndParent;
	bool m_bMouseIn;
	t_Rect m_rectPos;
	t_wndTop *m_pWndTop;
	int m_nX;
	int m_nY;
	int m_nWidth;
	int m_nHeight;
	std::string m_strText;
	std::string m_strName;
	bool m_bSupportNoHoldClick;
	bool m_bPushed;
};

} // namespace n_sgxx

#endif // UI_WNDBASE_INCLUDED