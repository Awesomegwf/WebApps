#ifndef T_IMAGESKIA_H
#define T_IMAGESKIA_H

#include "t_image.h"
#include "SkImage.h"
#include "SkData.h"
#include <SkImageEncoder.h>
namespace n_sgxx{

class  t_imageSkia:public t_imageBase
{
	public:
        t_imageSkia();
    	~t_imageSkia();
    	virtual bool LoadFromFile(const char *p_szFile);
       	virtual bool LoadFromData(const uchar *buf, int len);
        virtual bool Save(char *p_szFile);
        virtual t_imageBase* Scale(double dX, double dY);
        virtual bool IsValid();
        virtual int Width() const;
        virtual int Height() const;
        virtual int Depth() const;
        virtual bool HasAlphaChannel() const;
        virtual uchar* GetBits() const;
        sk_sp<SkImage> GetImage() const;
    private:
        int m_iWidth;
        int m_iHeight;
        int m_iDepth;
        bool m_iHasAlpha;
        unsigned char *m_iBits;
        sk_sp<SkImage> m_image;
        sk_sp<SkData> codeData;
};

}

#endif
