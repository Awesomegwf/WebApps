#include <iostream>
#include "t_fontSkia.h"
#include "SkTypeface.h"
#include "SkFontStyle.h"

using namespace std;

namespace n_sgxx
{
	t_fontSkia::t_fontSkia()
	{
		cout<<"t_fontSkia constructor"<<endl;
	}

	t_fontSkia::~t_fontSkia()
	{
//		Destrory();
	}	
	bool t_fontSkia::Create(char *p_szFamily, int p_nSize, bool p_bBold, bool p_bItalic, bool p_bUnderline)
	{
		cout<<"font size:"<<p_nSize<<endl;
		m_font = SkTypeface::MakeFromName(p_szFamily, SkFontStyle::Normal());
		m_fontSize = p_nSize;
		cout<<"font create"<<endl;
		return true;
	}

	int t_fontSkia::getFontSize() const
	{
		if(!m_fontSize)
		{
			return 0;
		}
		return m_fontSize;
	}

//	bool t_fontSkia::Destrory()
//	{
//		if(m_font)
//		{
//			delete m_font;
//			m_font=NULL;
//		}
//	}

	sk_sp<SkTypeface> t_fontSkia::getFont() const
	{
		if(!m_font)
		{
			return NULL;
		}
		return m_font;
	}
	bool t_fontSkia::Destroy()
	{
		return true;
	}
	t_fontBase *GetPlatformFont()
	{
    	return new t_fontSkia();
	}


} //namespace n_sgxx
