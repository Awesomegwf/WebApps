//
// SGkeyboardLib.h
//

#ifndef SOGOU_SOFTKEYBOARD_LIB_H
#define SOGOU_SOFTKEYBOARD_LIB_H

#define KEYBOARD_STATE_PY26		1
#define KEYBOARD_STATE_EN26		2
#define KEYBOARD_STATE_NUMBER	3

enum e_FunctionKey
{
	ec_none = -1,
	ec_Delete = 0,
	ec_Enter,
	ec_Space,
	ec_Reset,
	ec_Hide,
	ec_ChEn,
	ec_Shift,
	// edit相关
	ec_EditUp,
	ec_EditDown,
	ec_EditLeft,
	ec_EditRight,
	ec_EditSelect,
	ec_EditUnSelect,
	ec_EditSelectAll,
	ec_EditCopy,
	ec_EditPaste,
	ec_EditCut,
	ec_EditDelete,
	// 设置相关
	ec_SettingHW,
	ec_SettingCand,
	ec_SettingMore,
	ec_A,
	ec_PreOutput,	// 手写结果预上屏
	ec_Locked,		// symbol lock
	ec_AllSingleWordCand, // all word cand / signle word cand
	ec_FunctionKeyMax
};

#ifdef _WIN32
#define DLL_EXPORT __declspec(dllexport)
#else
#define DLL_EXPORT
#endif

// 设置键盘布局xml文件
extern "C" DLL_EXPORT bool SGkbSetLayoutFile(const char *p_szFile, const char *p_szResPath);
// 调起键盘
extern "C" DLL_EXPORT bool SGkbOpen(
	int p_nX,						// 键盘左上角位置
	int p_nY,						// 键盘左上角位置
	int p_nStateMode	// 键盘初始状态（中文、英文、数字）
);
// 关闭键盘
extern "C" DLL_EXPORT bool SGkbClose();
extern "C" DLL_EXPORT bool SGkbIsVisible();
// 设置键盘位置
extern "C" DLL_EXPORT bool SGkbSetPos(int p_nX, int p_nY);
// 设置转换状态（中文、英文、数字）
extern "C" DLL_EXPORT bool SGkbSetStateMode(int p_nStateMode);
// 恢复到默认
extern "C" DLL_EXPORT bool SGkbResetConvert();


// 设置client的回调接口
typedef bool (*fnCandOutput)(const char *p_szCand, bool bPreOutput);
typedef bool (*fnUpdateComp)(const char *p_szComp);
typedef bool (*fnFunctionKeyClick)(e_FunctionKey p_ecFuncKey);
typedef bool (*fnGetDeviceMetrics)(int& p_nWidth, int& p_nHeight);

extern "C" DLL_EXPORT bool SGkbSetOutputCandCallBack(fnCandOutput p_fnCallBack);
extern "C" DLL_EXPORT bool SGkbSetUpdateCompCallBack(fnUpdateComp p_fnCallBack);
extern "C" DLL_EXPORT bool SGkbSetFunctionKeyClickCallBack(fnFunctionKeyClick p_fnCallBack);
extern "C" DLL_EXPORT bool SGkbSetGetDeviceMetricsCallBack(fnGetDeviceMetrics p_fnCallBack);

// 设置shell的目录：库文件，系统词库目录，用户词库目录
extern "C" DLL_EXPORT bool SGkbSetShellPath(const char *p_szDll, const char *p_szSysDict, const char *p_szUsrDict);

#endif // SOGOU_SOFTKEYBOARD_LIB_H
