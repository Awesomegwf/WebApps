#include <iostream>
#include "t_wndTopSkia.h"
#include "t_hdcSkia.h"
#include <csignal>
#include <sys/time.h>

using namespace std;



namespace n_sgxx
{

	sgBitmap sgBitmap::gsgBitmap;


	void t_wndTopSkia::onpaintHandler()
	{
		cout<<"Interrupt signal received"<<endl;
		t_hdcSkia* hdc = new t_hdcSkia((t_wndTopSkia*)(m_bitmap->m_wndTopImpl));
		if(m_bitmap->bitMap) {
			m_bitmap->m_wndTopImpl->OnPaint(*hdc->GetDC());
		}
	}

	void signalhand(int sig)
	{
		cout<<"sig ocurred"<<endl;
	}


	sgBitmap::sgBitmap(t_wndTopImplBase *wndTopImpl)
	{
		m_wndTopImpl = wndTopImpl;
	}

	void sgBitmap::setWndTopImpl(t_wndTopImplBase *wndTopImpl)
	{
		m_wndTopImpl = wndTopImpl;
	}

	bool sgBitmap::getBitmap(int p_nWidth, int p_nHeight)
	{
		bitMap = new SkBitmap();
		bitMap->setInfo(SkImageInfo::Make(p_nWidth, p_nHeight, kRGBA_8888_SkColorType, kOpaque_SkAlphaType));
		bitMap->allocPixels();
		return true;
	}

}	//namespace n_sgxx

namespace n_sgxx
{
	t_wndTopSkia::t_wndTopSkia(){
		cout<<"t_wndTopSkia Constructor"<<endl;	
	}

	bool t_wndTopSkia::Create(int p_nStyle,int p_nX, int p_nY, int p_nWidth, int p_nHeight,t_wndTop *p_pParent)
	{
		cout<<"wndtop create"<<endl;
	    m_bitmap =  sgBitmap::getInstance();
	    m_bitmap->setWndTopImpl(this);
//	    m_bitmap->bitMap = m_bitmap->getBitmap(p_nWidth,p_nHeight);
	    m_bitmap->getBitmap(p_nWidth,p_nHeight);
//	    signal(SIGINT,signalhand);
	    return true;
	}

	sgBitmap* t_wndTopSkia::GetWnd()
	{
		if(!m_bitmap)
			return NULL;
		return m_bitmap;
	}

	void t_wndTopSkia::SetVisibled(bool p_bShow)
	{
		return;
	}

	void t_wndTopSkia::Invalidate(const t_Rect& p_rc, bool bForce) 
	{
		return;
	}

	void t_wndTopSkia::ResizeWnd(int nWidth, int nHeight)
	{
		cout<<"ResizeWnd"<<endl;
		m_bitmap->getBitmap(nWidth,nHeight);
//	    t_hdcSkia* hdc = new t_hdcSkia((t_wndTopSkia*)(m_bitmap->m_wndTopImpl));
//	    if(m_bitmap->bitMap) {
//	    	m_bitmap->m_wndTopImpl->OnPaint(*hdc->GetDC());
//	    }
		return;
	}

	void t_wndTopSkia::MoveWnd(int p_nX, int p_nY)
	{
		return;
	}

	int t_wndTopSkia::GetWndId()
	{
		cout<<"getWndid"<<endl;
		return 0;
	}

	t_wndTopImplBase *GetPlatformWndTop(t_wndTop *p_pDelegate)
	{
		t_wndTopSkia *pTop = new t_wndTopSkia();
        pTop->SetDelegate(p_pDelegate);
        return pTop;
	}

	int t_wndTopSkia::GetHandle()
	{ 
		cout<<"getHandle"<<endl;

		return  0;
	}

}	//namespace n_sgxx
