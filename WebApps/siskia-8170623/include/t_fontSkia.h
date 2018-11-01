#ifndef T_FONTSKIA_H
#define T_FONTSKIA_H

#include "t_font.h"
#include "SkTypeface.h"
namespace n_sgxx
{
	class t_fontSkia:public t_fontBase
	{
		public:
			t_fontSkia();
			~t_fontSkia();
			virtual bool Create(char *p_szFamily, int p_nSize, bool p_bBold = false, bool p_bItalic = false, bool p_bUnderline = false);
			virtual bool Destroy();
			sk_sp<SkTypeface>	getFont() const;
			int getFontSize() const;
//			bool Destrory();
		private:
			sk_sp<SkTypeface> m_font;
			int m_fontSize;
	};
	t_fontBase *GetPlatformFont();
}

#endif

