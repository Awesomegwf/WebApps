#include <iostream>
#include <vector>
#include <string>
#include <unistd.h>

/*
#include "t_hdcSkia.h"
#include "t_fontSkia.h"
#include "t_pen.h"
#include "Utils.h"
#include "Types.h"
*/
#include "SGkeyboardLib.h"

#include "t_hdcSkia.h"
#include "t_wndTopSkia.h"

#include <unistd.h>

#define MAX_PATH 256
#define SGARED_MEM_ID 1619
#define STR_BUFF 1024*8


using namespace std;
using namespace n_sgxx;



int main(int argc,char** argv)
{


    char szXml[MAX_PATH] = "/Resources/keyboard_atm.xml" ;
    std::string strFilePath = "/media/kylin/workspace2/siskia/";
    std::string strszDll = strFilePath + "SogouShell/libs/libSogouShell.so";
    std::string strSysDict = strFilePath + "SogouShell/dict/";
    std::string strUsrDict = strFilePath + "SogouShell/usr/";

    SGkbSetShellPath(strszDll.c_str(), strSysDict.c_str(), strUsrDict.c_str());
    cout<<"set shell path success"<<endl;
    SGkbSetLayoutFile(szXml,strFilePath.c_str());
    cout<<"set layout file success"<<endl;
    SGkbOpen(20, 245, -1);
    cout<<"sgkb open success"<<endl;



//    t_wndTopImplBase* m_wndTopImpl = new t_wndTopImplBase();

    t_hdcSkia hdc((t_wndTopSkia*)(sgBitmap::getInstance()->m_wndTopImpl));
    cout<<"Painted success"<<endl;
    (sgBitmap::getInstance()->m_wndTopImpl)->OnPaint(*hdc.GetDC());
//    SGkbSetOutputCandCallBack(NULL);
//    SGkbSetFunctionKeyClickCallBack(NULL);
	// cout<<"sougou test program"<<endl;
 //    //为了配合参数格式声明的变量
 //    t_wndTopSkia *topskia = new t_wndTopSkia();
 //    t_hdcSkia *hdc = new t_hdcSkia(topskia);
 //    t_pen *pen;
 //    Color cc;
 //    t_font *skiafont;
 //    UINT b;
 //    unsigned char a;
 //    t_Point *ponit;

 //    cout<<"hello"<<endl;
 //    hdc->test();
    
 //    // hdc->DrawText2("hello", skiafont, 20, 45, 67, 180, cc, b);
 //    hdc->DrawLine(288,96,288,160,*pen,a);
 //    // hdc->DrawRect(20,128,100,28,cc,true,*pen);
 //    // hdc->DrawCircle(140,150,35,*pen);
 //    // hdc->DrawPath(ponit,20,*pen);

 //    cout<<"hello"<<endl;
 //    delete hdc;
	return 0;
}
