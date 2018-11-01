#ifndef T_PENSKIA_H
#define T_PENSKIA_H

#include "t_pen.h"
#include "SkPaint.h"

namespace n_sgxx{
	class t_penSkia:public t_penBase
	{
		public:
			t_penSkia();
			~t_penSkia();
			virtual bool Create(int p_nStyle, int p_nWidth, Color p_clr);
		    virtual bool Destroy();
		    SkPaint* GetMpaint();
		private:
			SkPaint *m_paint;
	};
}

#endif
