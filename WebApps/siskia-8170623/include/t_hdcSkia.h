#ifndef T_HDCBASE_H
#define T_HDCBASE_H

#include "SkCanvas.h"
#include "SkBitmap.h"
#include "SkImageEncoder.h"
#include "SkPaint.h"
#include "SkData.h"
#include "SkImage.h"
#include "SkRect.h"
#include "SkPath.h"
#include "SkTypeface.h"

#include "t_hdc.h"
#include "t_pen.h"
#include "t_wndBase.h"

#include "t_wndTopSkia.h"


//#include "t_wndTopImplBase.h"

namespace n_sgxx {
class t_hdcSkia: public t_hdcBase
{
	public:
		t_hdcSkia();
		t_hdcSkia(t_wndTopSkia* topImplBase);
		~t_hdcSkia();
	    	virtual bool DrawLine(int p_nFromX, int p_nFromY, int p_nToX,int p_nToY,const t_pen& p_pen,uchar p_uAlpha);
	     	virtual bool DrawRect(int p_nX, int p_nY, int p_nWidth, int p_nHeight, Color p_clrFill, bool p_bFill, const t_pen& p_pen);
	    	virtual bool DrawRect(const t_Rect& p_rc, Color p_clrFill, bool p_bFill, const t_pen& p_pen);
	    	virtual bool FillRect(int p_nX, int p_nY, int p_nWidth, int p_nHeight, Color p_clrFill) ;
	    	virtual bool FillRect(const t_Rect& p_rc, Color p_clrFill);
	    	virtual bool DrawImage(int p_nDstX, int p_nDstY, int p_nDstWidth, int p_nDstHeight, const t_image &image, int p_nSrcX, int p_nSrcY, int p_nSrcWidth, int p_nSrcHeight);
	    	virtual bool DrawImage(const t_Rect& targetRect, const t_image &image, const t_Rect& sourceRect);
	    	virtual bool MeasureString(const char *p_szString, const t_font* p_pFont, int &p_nWidth, int &p_nHeight, UINT p_uFormat);
	    	virtual bool DrawText2(const char *p_szText, const t_font* p_pFont, int p_nX, int p_nY, int p_nWidth, int p_nHeight, Color p_clr, UINT p_uFormat);
	    	virtual bool DrawText2(const char *p_szText, const t_font* p_pFont, t_Rect *p_lpRect, Color p_clr, UINT p_uFormat);
	    	virtual bool Render(int p_nDestX, int p_nDestY, int p_nDestWidth, int p_nDestHeight, t_hdcBase *p_hdcSrc, int p_nSrcX, int p_nSrcY,int p_nSrcWidth, int p_nSrcHeight) ;
	    	virtual bool SetClipRect(int p_nX, int p_nY, int p_nWidth, int p_nHeight);
	    	virtual bool DrawPath(t_Point *p_pPoints, int p_nCnt, const t_pen& p_pen);
	    	virtual bool DrawCircle(int cx, int cy, int radius, const t_pen& p_pen);
            void test();
            t_hdc *GetDC();
            sgBitmap * GetSkiaBitmap();
	private:
		t_hdc *m_pHdc;
		sgBitmap *m_skbitmap;
		SkCanvas *canvas;
};
}

#endif 
