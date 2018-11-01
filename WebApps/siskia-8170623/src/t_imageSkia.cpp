#include <iostream>
#include "SkBitmap.h"
#include "SkCanvas.h"
#include <string>
#include <vector>

#include "t_imageSkia.h"

using namespace std;

vector<string> split(const string &s, const string &seperator){
	vector<string> result;
	typedef string::size_type string_size;
	string_size i = 0;

	while(i != s.size()){
		int flag = 0;
		while(i != s.size() && flag == 0){
			flag = 1;
			for(string_size x = 0; x < seperator.size(); ++x)
				if(s[i] == seperator[x]){
					++i;
					flag = 0;
					break;
				}
		}

		flag = 0;
		string_size j = i;
		while(j != s.size() && flag == 0){
			for(string_size x = 0; x < seperator.size(); ++x)
				if(s[j] == seperator[x]){
					flag = 1;
					break;
				}
			if(flag == 0)
				++j;
		}
		if(i != j){
			result.push_back(s.substr(i, j-i));
			i = j;
		}
}
return result;
}
namespace n_sgxx
{
	t_imageSkia::t_imageSkia()
	{
//		cout<<"t_imageSkia non para constructor"<<endl;
	}

	t_imageSkia::~t_imageSkia()
	{
//		cout<<"t_imageSkia destructor"<<endl;
	}

	bool t_imageSkia::LoadFromFile(const char *p_szFile)
	{
//		SkBitmap bitmap;
//		    //设置Bitmap的配置信息
//		    bitmap.setInfo(SkImageInfo::Make(648, 252, kBGRA_8888_SkColorType, kOpaque_SkAlphaType));
//		    //转换为像素填充
//		    bitmap.allocPixels();
//		    //创建画布
//		    SkCanvas canvas(bitmap);
//		    canvas.clear(SK_ColorRED);
		cout<<"LoadFromFile called+path:"<<p_szFile<<endl;
        string path = p_szFile;
        path = path.replace(path.find("\\"),1,"/");
        path = path.replace(path.find("\\"),1,"");
        path = path.replace(path.find("\\"),1,"/");
        path = path.replace(path.find("\\"),1,"");
        const char* filepath;

        vector<string> v;
        v = split(path,",");
        filepath = v[0].c_str();
        sk_sp<SkData> codeData1(SkData::MakeFromFileName(filepath));


		m_image = SkImage::MakeFromEncoded(codeData1);

		//printf("m_image width():%d\n", m_image->width());
//		SkBitmap bitmap;
//		bitmap.setInfo(SkImageInfo::Make(648, 252, kBGRA_8888_SkColorType, kOpaque_SkAlphaType));
//		bitmap.allocPixels();
//
//		SkCanvas canvas(bitmap);
//		canvas.drawImage(m_image,0,0);
//		const char* path1 = "./biubiu.png";
//		SkFILEWStream data(path1);
//		if(data.isValid()){
//		   SkEncodeImage(&data, bitmap, SkEncodedImageFormat::kPNG, 100);
//		}

		return true;
	}

   	bool t_imageSkia::LoadFromData(const uchar *buf, int len)
   	{
   		return true;
   	}

    bool t_imageSkia::Save(char *p_szFile)
    {
    	cout<<"save 59"<<endl;
    	return false;
    }

    t_imageBase* t_imageSkia::Scale(double dX, double dY)
    {
    	cout<<"dx:"<<dX<<"dy"<<dY<<endl;

    	return this;
    }

    bool t_imageSkia::IsValid() 
    {
//    	cout<<"isValid 69"<<endl;
    	return !!m_image;
    }

    int t_imageSkia::Width() const
    {
//    	cout<<"width 77"<<endl;
    	return m_image->width();
    }

    int t_imageSkia::Height() const
    {
//    	cout<<"height 83"<<endl;
    	return m_image->height();
    }

    int t_imageSkia::Depth() const 
    {
//    	cout<<"depth 89"<<endl;
    	return m_iDepth;
    }

    bool t_imageSkia::HasAlphaChannel() const
    {
//    	cout<<"hasAlpha 95"<<endl;
    	return m_iHasAlpha;
    }

    uchar* t_imageSkia::GetBits() const
    {
//    	cout<<"GetBits 101"<<endl;
    	return m_iBits;
    }

    sk_sp<SkImage> t_imageSkia::GetImage() const
    {
//    	cout<<"m_image return"<<endl;
    	return m_image;
    }

    t_imageBase *GetPlatformImage()
    {
//    	cout<<"new t_imageSkia"<<endl;
        return new t_imageSkia();
    }
}//namespace end
