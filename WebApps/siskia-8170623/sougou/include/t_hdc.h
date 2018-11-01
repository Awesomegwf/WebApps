//
// t_hdc.h
// dc: canvas
//

#ifndef	UI_HDC_INCLUDED
#define UI_HDC_INCLUDED

#include "UI.h"
#include "t_image.h"
#include "t_font.h"
#include "t_pen.h"
#include "Utils.h"

//#if defined(SGXX_OS_FAMILY_WINDOWS)
//#include "../platform/Win32/Include/t_hdcWin32.h"
//#elif defined(SGXX_OS_FAMILY_ANDRIOD)
//#include "../platform/Android/Include/t_hdcAndroid.h"
//#elif defined(SGXX_OS_FAMILY_UNIX)
//#include "../platform/Linux/Include/t_hdcLinux.h"
//#else
//#endif

/*
 * DrawText() Format Flags
 */
#define DT_TOP                      0x00000000
#define DT_LEFT                     0x00000000
#define DT_CENTER                   0x00000001
#define DT_RIGHT                    0x00000002
#define DT_VCENTER                  0x00000004
#define DT_BOTTOM                   0x00000008
#define DT_WORDBREAK                0x00000010
#define DT_SINGLELINE               0x00000020
#define DT_EXPANDTABS               0x00000040
#define DT_TABSTOP                  0x00000080
#define DT_NOCLIP                   0x00000100
#define DT_EXTERNALLEADING          0x00000200
#define DT_CALCRECT                 0x00000400
#define DT_NOPREFIX                 0x00000800
#define DT_INTERNAL                 0x00001000

namespace n_sgxx {

	// t_pen
	// t_brush

class t_hdcBase
{
public:
	virtual ~t_hdcBase() {}
	virtual bool DrawLine(int p_nFromX, int p_nFromY, int p_nToX, int p_nToY, const t_pen& p_pen, uchar p_uAlpha) = 0;
	virtual bool DrawRect(int p_nX, int p_nY, int p_nWidth, int p_nHeight, Color p_clrFill, bool p_bFill, const t_pen& p_pen) = 0;
	virtual bool DrawRect(const t_Rect& p_rc, Color p_clrFill, bool p_bFill, const t_pen& p_pen) = 0;
	virtual bool FillRect(int p_nX, int p_nY, int p_nWidth, int p_nHeight, Color p_clrFill) = 0;
	virtual bool FillRect(const t_Rect& p_rc, Color p_clrFill) = 0;
	virtual bool DrawImage(int p_nDstX, int p_nDstY, int p_nDstWidth, int p_nDstHeight, const t_image &image, int p_nSrcX, int p_nSrcY, int p_nSrcWidth, int p_nSrcHeight) = 0;
	virtual bool DrawImage(const t_Rect& targetRect, const t_image &image, const t_Rect& sourceRect) = 0;
	virtual bool MeasureString(const char *p_szString, const t_font* p_pFont, int &p_nWidth, int &p_nHeight, UINT p_uFormat) = 0;
	virtual bool DrawText2(const char *p_szText, const t_font* p_pFont, int p_nX, int p_nY, int p_nWidth, int p_nHeight, Color p_clr, UINT p_uFormat) = 0;
	virtual bool DrawText2(const char *p_szText, const t_font* p_pFont, t_Rect *p_lpRect, Color p_clr, UINT p_uFormat) = 0;
	virtual bool Render(int p_nDestX, int p_nDestY, int p_nDestWidth, int p_nDestHeight, t_hdcBase *p_hdcSrc, int p_nSrcX, int p_nSrcY, 
		int p_nSrcWidth, int p_nSrcHeight) = 0;
	virtual bool SetClipRect(int p_nX, int p_nY, int p_nWidth, int p_nHeight) = 0;
	virtual bool DrawPath(t_Point *p_pPoints, int p_nCnt, const t_pen& p_pen) = 0;
	virtual bool DrawCircle(int cx, int cy, int radius, const t_pen& p_pen) = 0;
};

class Keyboard_API t_hdc : public t_hdcBase
{
public:
	t_hdc(t_hdcBase *p_pImpl);
	~t_hdc();
	
	// t_hdcBase
	virtual bool DrawLine(int p_nFromX, int p_nFromY, int p_nToX, int p_nToY, const t_pen& p_pen, uchar p_uAlpha);
	virtual bool DrawRect(int p_nX, int p_nY, int p_nWidth, int p_nHeight, Color p_clrFill, bool p_bFill, const t_pen& p_pen);
	virtual bool DrawRect(const t_Rect& p_rc, Color p_clrFill, bool p_bFill, const t_pen& p_pen);
	virtual bool FillRect(int p_nX, int p_nY, int p_nWidth, int p_nHeight, Color p_clrFill);
	virtual bool FillRect(const t_Rect& p_rc, Color p_clrFill);
	virtual bool DrawImage(int p_nDstX, int p_nDstY, int p_nDstWidth, int p_nDstHeight, const t_image &image, int p_nSrcX, int p_nSrcY, int p_nSrcWidth, int p_nSrcHeight);
	virtual bool DrawImage(const t_Rect& targetRect, const t_image &image, const t_Rect& sourceRect);
	virtual bool MeasureString(const char *p_szString, const t_font* p_pFont, int &p_nWidth, int &p_nHeight, UINT p_uFormat);
	virtual bool DrawText2(const char *p_szText, const t_font* p_pFont, int p_nX, int p_nY, int p_nWidth, int p_nHeight, Color p_clr, UINT p_uFormat);
	virtual bool DrawText2(const char *p_szText, const t_font* p_pFont, t_Rect *p_lpRect, Color p_clr, UINT p_uFormat);
	virtual bool Render(int p_nDestX, int p_nDestY, int p_nDestWidth, int p_nDestHeight, t_hdcBase *p_hdcSrc, int p_nSrcX, int p_nSrcY, 
		int p_nSrcWidth, int p_nSrcHeight);
	virtual bool SetClipRect(int p_nX, int p_nY, int p_nWidth, int p_nHeight);
	virtual bool DrawPath(t_Point *p_pPoints, int p_nCnt, const t_pen& p_pen);
	virtual bool DrawCircle(int cx, int cy, int radius, const t_pen& p_pen);

	//platform independent
	bool GridRender(int p_nDestX, int p_nDestY, int p_nDestWidth, int p_nDestHeight, t_hdcBase *p_hdcSrc, int p_nSrcX, int p_nSrcY, 
		int p_nSrcWidth, int p_nSrcHeight, int p_nLeft, int p_nTop, int p_nRight, int p_nBottom, bool p_bDrawCenter);

	void ClearClipRect();

private:
	t_hdcBase *m_pImpl;
};

t_hdcBase *GetPlatformHdc();

} // namespace n_sgxx

#endif // UI_HDC_INCLUDED