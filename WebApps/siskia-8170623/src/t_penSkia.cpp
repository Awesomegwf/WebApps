#include <iostream>
#include "t_penSkia.h"

using namespace std;

namespace n_sgxx
{

    t_penSkia::t_penSkia()
    {

    }

    t_penSkia::~t_penSkia()
    {
    	Destroy();
    }

    bool t_penSkia::Create(int p_nStyle, int p_nWidth, Color p_clr)
    {
        cout<<"pen Create is start"<<endl;
        if ( m_paint )
        {
            Destroy();
        }
        m_paint = new SkPaint();
        // m_paint->setStyle(p_nStyle);
        m_paint->setStrokeWidth(p_nWidth);
        m_paint->setColor(MAKEARGB(p_clr));


        return m_paint != NULL;
    }
    
    bool t_penSkia::Destroy()
    {
    	return true;
    }

    SkPaint * t_penSkia::GetMpaint()
    {
        if ( !m_paint )
            return NULL;
        return m_paint;
    }

    t_penBase *GetPlatformPen()
    {
        return new t_penSkia();
    }
} //namespace n_sgxx