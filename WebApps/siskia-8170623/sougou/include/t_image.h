//
// t_image.h
//

#ifndef	UI_IMAGE_INCLUDED
#define UI_IMAGE_INCLUDED

#include "UI.h"

//#if defined(SGXX_OS_FAMILY_WINDOWS)
//#include "../platform/Win32/Include/t_imageWin32.h"
//#elif defined(SGXX_OS_FAMILY_ANDRIOD)
//#include "../platform/Android/Include/t_imageAndroid.h"
//#elif defined(SGXX_OS_FAMILY_UNIX)
//#include "../platform/Linux/Include/t_imageLinux.h"
//#else
//#endif

namespace n_sgxx {

	class t_imageBase
	{
	public:
		virtual ~t_imageBase() {}
		virtual bool LoadFromFile(const char *p_szFile) = 0;
		virtual bool LoadFromData(const uchar *buf, int len) = 0;
		virtual bool Save(char *p_szFile) = 0;
		virtual t_imageBase* Scale(double dX, double dY) = 0;
		virtual bool IsValid() = 0;
		virtual int Width() const = 0;
		virtual int Height() const = 0;
		virtual int Depth() const = 0;
		virtual bool HasAlphaChannel() const = 0;
		virtual uchar* GetBits() const = 0;
	};

	class Keyboard_API t_image : public t_imageBase
	{
	public:
		t_image();
		explicit t_image(t_imageBase *p_pImpl);
		t_image(char *p_szFile);
		t_image(const uchar *buf, int len);
		~t_image();

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
		t_imageBase* PlatformImage() const;

	private:
		t_imageBase *m_pImpl;
	};

	t_imageBase *GetPlatformImage();

} // namespace n_sgxx

#endif // UI_IMAGE_INCLUDED