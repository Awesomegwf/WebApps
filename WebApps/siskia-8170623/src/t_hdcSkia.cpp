#include <iostream>
#include "t_hdcSkia.h"
#include "t_penSkia.h"
#include "t_imageSkia.h"
#include "t_fontSkia.h"

#include <string>

using namespace std;

namespace n_sgxx
    {

    t_hdcSkia::t_hdcSkia(){
    }

    t_hdcSkia::t_hdcSkia(t_wndTopSkia *topImplBase){
    	m_pHdc = new t_hdc(this);
        m_skbitmap = topImplBase->GetWnd();
        canvas = new SkCanvas(*(m_skbitmap->bitMap));
    }

    t_hdcSkia::~t_hdcSkia(){   
    }

    void t_hdcSkia::test()
    {
        cout<<"this is a test about this program"<<endl;
    }

    bool t_hdcSkia::DrawLine(int p_nFromX,int p_nFromY,int p_nToX,int p_nToY,const t_pen& p_pen,uchar p_uAlpha)
    {    
    	cout<<"DrawLine() is running"<<endl;
        //SkCanvas canvas(*(m_skbitmap->bitMap)); //bitmap
        SkPaint paint;
        paint = *(((t_penSkia *)p_pen.PlatformPen())->GetMpaint());
        paint.setAlpha(p_uAlpha);
        canvas->drawLine(p_nFromX,p_nFromY, p_nToX, p_nToY, paint);
        paint.reset();
        //m_skbitmap->bitMap.reset();
        return true;
    }
    
    bool t_hdcSkia::DrawRect(int p_nX, int p_nY, int p_nWidth, int p_nHeight, Color p_clrFill, bool p_bFill, const t_pen& p_pen)
    {
    	cout<<"DrawRect is running"<<endl;
    	//SkCanvas canvas(*(m_skbitmap->bitMap));
    	SkPaint paint;
    	paint = *(((t_penSkia *)p_pen.PlatformPen())->GetMpaint());
    	SkPoint rectPts[] = { {(float)p_nX, (float)p_nY}, {(float)p_nHeight, (float)p_nWidth} };
    	SkRect rect;
    	rect.set(rectPts[0],rectPts[1]);
    	canvas->drawRect(rect,paint);
    	paint.reset();
    	//m_skbitmap->bitMap.reset();
    	return true;
    }
    bool t_hdcSkia::DrawRect(const t_Rect& p_rc, Color p_clrFill, bool p_bFill, const t_pen& p_pen)
    {
    	cout<<"DrawRect2 is running"<<endl;
        //SkCanvas canvas(*(m_skbitmap->bitMap));
        SkIRect rect = {p_rc.left, p_rc.right, p_rc.GetWidth(), p_rc.GetHeight()};
        SkPaint paint;
        paint = *(((t_penSkia *)p_pen.PlatformPen())->GetMpaint());
        canvas->drawIRect(rect, paint);
        paint.reset();
        //m_skbitmap->bitMap.reset();
        return true;
    }

	bool t_hdcSkia::FillRect(int p_nX, int p_nY, int p_nWidth, int p_nHeight, Color p_clrFill)
    {
		cout<<"fillRect is running"<<endl;
		//SkCanvas canvas(*(m_skbitmap->bitMap));
		canvas->clipRect(SkRect::MakeWH(p_nWidth,p_nHeight));
	    canvas->drawColor(SkColorSetARGB(p_clrFill.a, p_clrFill.r, p_clrFill.g, p_clrFill.b), SkBlendMode::kPlus);
		return true;
    }
    
    bool t_hdcSkia::FillRect(const t_Rect& p_rc, Color p_clrFill)
    {
    	cout<<"fillRect 2 is running"<<endl;
    	return FillRect(p_rc.left, p_rc.top, p_rc.GetWidth(), p_rc.GetHeight(), p_clrFill);
    }

    bool t_hdcSkia::DrawImage(int p_nDstX, int p_nDstY, int p_nDstWidth, int p_nDstHeight, const t_image &image, int p_nSrcX, int p_nSrcY, int p_nSrcWidth, int p_nSrcHeight)
    {
    	cout<<"DrawImage is running"<<endl;
//    	sk_sp<SkImage> myImage = ((t_imageSkia*)image.PlatformImage())->GetImage();
//    	static SkPaint *paint =new SkPaint();
//    	SkCanvas canvas(*(m_skbitmap->bitMap));
//        canvas->drawImageRect(myImage,SkRect::MakeXYWH(p_nSrcX,p_nSrcY, p_nSrcWidth,p_nSrcHeight),SkRect::MakeXYWH(p_nDstX,p_nDstY,p_nDstWidth,p_nDstHeight),paint);
//        delete paint;
        return true;
    }

	bool t_hdcSkia::DrawImage(const t_Rect& targetRect, const t_image &image, const t_Rect& sourceRect)
    {
		sk_sp<SkImage> myImage = ((t_imageSkia*)image.PlatformImage())->GetImage();
		cout<<"DrawImage2 is running"<<myImage.get()<<endl;

		cout<<myImage.get()->width()<<" "<<targetRect.top<<" "<<targetRect.right<<" "<<targetRect.bottom<<endl;
//		cout<<"hello world"<<endl;
//		printf("myImage:%d", myImage->width());
		static SkPaint *paint =new SkPaint();
//		canvas(*(m_skbitmap->bitMap));

		static int x = 0;
		x+=1;

		//if(x!=2 && x!=3)
		canvas->drawImageRect(
				myImage,
				SkRect::MakeLTRB(sourceRect.left,sourceRect.top,sourceRect.right,sourceRect.bottom),
			    SkRect::MakeLTRB(targetRect.left, targetRect.top, targetRect.right, targetRect.bottom),
				nullptr,
				SkCanvas::kStrict_SrcRectConstraint);

//		canvas->drawImage(myImage.get(), 0, 0);
		cout<<sourceRect.GetHeight()<<endl;

		const char* path1 = "./image.png";

		SkFILEWStream data(path1);
		if(data.isValid()){
		      SkEncodeImage(&data, *(m_skbitmap->bitMap), SkEncodedImageFormat::kPNG, 100);
		}else
		{
			cout<<"error"<<endl;
		}

		return true;
    }

    bool t_hdcSkia::MeasureString(const char *p_szString, const t_font* p_pFont, int &p_nWidth, int &p_nHeight, UINT p_uFormat)
    {
    	cout<<"measure is running"<<endl;
        return true;
    }

	bool t_hdcSkia::DrawText2(const char *p_szText, const t_font* p_pFont, int p_nX, int p_nY, int p_nWidth, int p_nHeight, Color p_clr, UINT p_uFormat)
    {
		cout<<"p_nX:"<<p_nX<<"p_nY:"<<p_nY<<endl;
//		//SkCanvas canvas(*(m_skbitmap->bitMap));
//        canvas->clear(SK_ColorWHITE);
//        SkPaint paint;
//        paint.setTypeface(SkTypeface::MakeFromName("monospace", SkFontStyle()));
//        canvas->drawString(p_szText,p_nX,p_nY,paint);
        return true;
    }

	bool t_hdcSkia::DrawText2(const char *p_szText, const t_font* p_pFont, t_Rect *p_lpRect, Color p_clr, UINT p_uFormat)
    {
		cout<<"DrawText2 is running"<<endl;
		cout<<*p_szText<<endl;
		SkPaint paint;

		/*
		 * 注释部分是可以利用其他字体
		 */
//		sk_sp<SkTypeface> font = SkTypeface::MakeFromFile("NotoSansHans-Regular.otf", 0);
//		if(font)
//		{
//		    paint.setTypeface(font);
////		    cout<<"size:"<<p_pFont->m_nSize<<endl;
//		    int t_top = p_lpRect->top+(p_lpRect->GetHeight())/1.5;
//		    int t_left = p_lpRect->left+(p_lpRect->GetWidth())/2;
//		    canvas->drawString(p_szText,t_left,t_top,paint);
//		}

		sk_sp<SkTypeface> fontType = ((t_fontSkia*)p_pFont->PlatformFont())->getFont();
		int ftSize = ((t_fontSkia*)p_pFont->PlatformFont())->getFontSize();
//		paint.setTypeface(SkTypeface::MakeFromName("微软雅黑", SkFontStyle()));
		paint.setTypeface(fontType);
		paint.setTextSize(ftSize);
		int t_top = p_lpRect->top+(p_lpRect->GetHeight())/1.5;
		int t_left = p_lpRect->left+(p_lpRect->GetWidth())/3;
		canvas->drawString(p_szText,t_left,t_top,paint);

//		canvas->drawString(p_szText,p_lpRect->left,p_lpRect->top,paint);
        return true;
    }
    bool t_hdcSkia::Render(int p_nDestX, int p_nDestY, int p_nDestWidth, int p_nDestHeight, t_hdcBase *p_hdcSrc, int p_nSrcX, int p_nSrcY,int p_nSrcWidth, int p_nSrcHeight)
    {
    	cout<<"render is runing"<<endl;
        if(p_hdcSrc==NULL)
        {
        	return false;
        }
        //SkCanvas canvas(*(m_skbitmap->bitMap));
        t_hdcSkia *hdcSkia = static_cast<t_hdcSkia*> (p_hdcSrc);
        SkBitmap *myMitmap = hdcSkia->GetSkiaBitmap()->bitMap;
//        canvas->drawBitmap(mybitmap,)
    	return true;
    }

    bool t_hdcSkia::SetClipRect(int p_nX, int p_nY, int p_nWidth, int p_nHeight)
    {
    	cout<<"setClipRect is running"<<endl;
    	//SkCanvas canvas(*(m_skbitmap->bitMap));
//    	canvas->clipRect()(SkRect::MakeWH(p_nWidth, p_nHeight), SkClipOp::kIntersect, false);
        return true;
    }
    
    bool t_hdcSkia::DrawPath(t_Point *p_pPoints, int p_nCnt, const t_pen& p_pen)
    {
    	cout<<"drawpath is runing"<<endl;
        SkBitmap bitmap;
        bitmap.setInfo(SkImageInfo::Make(500, 300, kBGRA_8888_SkColorType, kOpaque_SkAlphaType));
         //转换为像素填充
        bitmap.allocPixels();
         //创建画布
        //SkCanvas canvas(bitmap);
        canvas->clear(SK_ColorWHITE);

        SkPaint paint;
        paint.setAntiAlias(true);

        SkPath path;
        path.moveTo(20, 20);
        path.quadTo(60, 20, 60, 60);
        path.close();
        canvas->drawPath(path,paint);

        const char* filepath = "./path.png";
        SkFILEWStream data(filepath);
        if(data.isValid()){
            SkEncodeImage(&data, bitmap, SkEncodedImageFormat::kPNG, 100);
        }

        return true;
    }

	bool t_hdcSkia::DrawCircle(int cx, int cy, int radius, const t_pen& p_pen)
    {
		cout<<"dracircle is running"<<endl;
        SkBitmap bitmap;
        bitmap.setInfo(SkImageInfo::Make(500, 300, kBGRA_8888_SkColorType, kOpaque_SkAlphaType));
         //转换为像素填充
        bitmap.allocPixels();
         //创建画布
        //SkCanvas canvas(bitmap);
        //canvas->clear(SK_ColorWHITE);

        SkPaint paint;
        paint.setAntiAlias(true);
        canvas->drawCircle(cx, cy, radius, paint);
        const char* path = "./circle.png";

        SkFILEWStream data(path);
        if(data.isValid()){
            SkEncodeImage(&data, bitmap, SkEncodedImageFormat::kPNG, 100);
        }
        return true;
    }

    t_hdcBase *GetPlatformHdc()
    {
    	cout<<"t_hdcBase GetPlatformHdc"<<endl;
        return new t_hdcSkia();
    }

    t_hdc* t_hdcSkia::GetDC()
    {
    	return m_pHdc;
    }
    sgBitmap* t_hdcSkia::GetSkiaBitmap()
        {
            if(!m_skbitmap)
                return NULL;
            return m_skbitmap;
        }
}   //namespace n_sgxx
