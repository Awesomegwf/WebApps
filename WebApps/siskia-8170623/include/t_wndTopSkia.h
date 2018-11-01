#ifndef T_WNDTOPSKIA_H
#define T_WNDTOPSKIA_H

#include "t_wndTopImplBase.h"
#include "t_wndTop.h"

#include "SkBitmap.h"
//#include "t_hdcSkia.h"

namespace n_sgxx
{

class sgBitmap {
    public:
		sgBitmap(){}
    	sgBitmap(t_wndTopImplBase* wndTopImpl);
        bool getBitmap(int p_nWidth,int p_nHeight);
        void setWndTopImpl(t_wndTopImplBase *wndTopImpl);
        SkBitmap* bitMap;
        t_wndTopImplBase *m_wndTopImpl;

        static sgBitmap* getInstance(){
            return &gsgBitmap;
        }
    private:
        static sgBitmap gsgBitmap;
};

extern sgBitmap* globalBitmap;

class t_wndTopSkia : public t_wndTopImplBase{
    public:
        t_wndTopSkia();
        virtual bool Create(int p_nStyle, int p_nX, int p_nY, int p_nWidth, int p_nHeight,t_wndTop *p_pParent);
        virtual void SetVisibled(bool p_bShow);
        virtual void Invalidate(const t_Rect& p_rc, bool bForce = false) ;
        virtual void ResizeWnd(int nWidth, int nHeight);
        virtual void MoveWnd(int p_nX, int p_nY);
        virtual int GetHandle();
        virtual int GetWndId();
        sgBitmap *GetWnd();
        void onpaintHandler();
//        sgBitmap *m_bitmap;
    private:
        sgBitmap* m_bitmap;
};

}   //namespace n_sgxx
#endif
