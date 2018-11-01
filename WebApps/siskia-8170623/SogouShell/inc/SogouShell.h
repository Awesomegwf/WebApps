#pragma once

#include <string>
#include <vector>

class CSGString
{
public:
	virtual const char *c_str() const = 0;
	virtual size_t length() const = 0;
};

class CSGStringArray
{
public:
	virtual const CSGString& at(size_t) const = 0;
	virtual size_t size() const = 0;
};

typedef enum {
	ec_paramInvalid = 0,
	ec_paramPYAppAdjust = 1,
	ec_paramPYTradition = 2,
	ec_paramHWTradition = 3,
	ec_paramPYSaveUsrDict = 4,
	ec_paramPYClearUsrDict = 5,
	ec_paramPYStrokeFilter = 6,	// stroke filter, value can ben e_stroke
	ec_paramPYSingleFilter = 7,	// single word filter
	ec_paramPYRefreshCand = 8,	// restore original cands
	ec_paramPYInputPredict = 9,	// not support
	ec_paramPYPersonNameMode = 10,
	ec_paramPYShuangPinMode = 11,	// not support
	ec_paramPYClearContact = 12,
	ec_paramPYSetShiftState = 13,	// not support
	ec_paramPYEnFilter = 14,	// not support
	ec_paramPYNumFilter = 15,	// not support
	ec_paramMax
} e_param;

typedef enum {
	ec_infoInvalid = 0,
	ec_infoHWRecogResult = 1,
	ec_infoPYNextSuggKey = 2,
	ec_infoUsrDirError = 3,
	ec_infoCandExtraInfo = 4,	// not support
	ec_infoMax
} e_info;

typedef enum  {
   ec_firstStrokeAll = 0U,
   ec_firstStrokeHorizontal = 1U,
   ec_firstStrokeVertical = 2U,
   ec_firstStrokeSkimming = 3U,
   ec_firstStrokeDot = 4U,
   ec_firstStrokeFolding = 5U
} e_stroke;

typedef enum {
	ec_catFree = 0,
	ec_catContact = 1,
	ec_catAddress = 2,
	ec_catMedia = 3,
	ec_catMax
} e_category;

class CSogouShell
{
public:
	typedef enum {
		ec_modeInvalid = -1,
		ec_modePy9 = 0,
		ec_modePy26 = 1,
		ec_modeZhuyin = 2,
		ec_modeKorean = 3,
		ec_modeBihua = 4,
		ec_modeHWSingle = 5,
		ec_modeHWOverlap = 6,
		ec_modeHWLine = 7,
		ec_modeWubi = 8,
		ec_modeHWJapan = 9,
		ec_modeHWKorea = 10,
		ec_modeKoreanChunjiin = 11,
		ec_modeCangJie = 12,
		ec_modeJapanKana = 13,	// (12 keys)
		ec_modeJapanRoma = 14,
		ec_modeJapanKana50 = 15,
		ec_modeHWEnglish = 16,
		ec_modeEn26 = 17,
		ec_modeEn9 = 18,	// not support
		ec_modePy9Sp = 19,	// not support
		ec_modePy26Sp = 20,	// not support
		ec_modeTaStart = 100,
		ec_modeAf =	ec_modeTaStart,
		ec_modeAr =	101,
		ec_modeAs =	102,
		ec_modeAz =	103,
		ec_modeBe =	104,
		ec_modeBg =	105,
		ec_modeBn =	106,
		ec_modeBo =	107,
		ec_modeBsLAT =	108,
		ec_modeCa =	109,
		ec_modeCs =	110,
		ec_modeDa =	111,
		ec_modeDe =	112,
		ec_modeEl =	113,
		ec_modeEn =	114,
		ec_modeEnAU =	115,
		ec_modeEnGB =	116,
		ec_modeEnIN =	117,
		ec_modeEnUS =	118,
		ec_modeEs =	119,
		ec_modeEsLAT =	120,
		ec_modeEsUS =	121,
		ec_modeEt =	122,
		ec_modeEu =	123,
		ec_modeFa =	124,
		ec_modeFi =	125,
		ec_modeFrCA =	126,
		ec_modeFrFR =	127,
		ec_modeGa =	128,
		ec_modeGl =	129,
		ec_modeGu =	130,
		ec_modeHa =	131,
		ec_modeHe =	132,
		ec_modeHi =	133,
		ec_modeHr =	134,
		ec_modeHu =	135,
		ec_modeHy =	136,
		ec_modeId =	137,
		ec_modeIg =	138,
		ec_modeIs =	139,
		ec_modeIt =	140,
		ec_modeJv =	141,
		ec_modeKa =	142,
		ec_modeKk =	143,
		ec_modeKm =	144,
		ec_modeKn =	145,
		ec_modeKuLAT =	146,
		ec_modeKy =	147,
		ec_modeLo =	148,
		ec_modeLt =	149,
		ec_modeLv =	150,
		ec_modeMg =	151,
		ec_modeMk =	152,
		ec_modeMl =	153,
		ec_modeMn =	154,
		ec_modeMr =	155,
		ec_modeMs =	156,
		ec_modeMy =	157,
		ec_modeNb =	158,
		ec_modeNe =	159,
		ec_modeNl =	160,
		ec_modeOr =	161,
		ec_modePaGUR =	162,
		ec_modePl =	163,
		ec_modePs =	164,
		ec_modePt =	165,
		ec_modePtBR =	166,
		ec_modeRo =	167,
		ec_modeRu =	168,
		ec_modeRw =	169,
		ec_modeSdAR =	170,
		ec_modeSi =	171,
		ec_modeSk =	172,
		ec_modeSl =	173,
		ec_modeSq =	174,
		ec_modeSrCY =	175,
		ec_modeSrLAT =	176,
		ec_modeSu =	177,
		ec_modeSv =	178,
		ec_modeSw =	179,
		ec_modeTa =	180,
		ec_modeTe =	181,
		ec_modeTg =	182,
		ec_modeTh =	183,
		ec_modeTkLAT =	184,
		ec_modeTl =	185,
		ec_modeTr =	186,
		ec_modeTt =	187,
		ec_modeUg =	188,
		ec_modeUk =	189,
		ec_modeUr =	190,
		ec_modeUzLAT =	191,
		ec_modeVi =	192,
		ec_modeYo =	193,
		ec_modeZu =	194,
		ec_modeTaEnd,
		ec_mode_Cnt
	}e_mode;
public:
	virtual ~CSogouShell(){};

	//init
	virtual bool Init(const char *pathSysDict, const char *pathUsrDict) = 0;

	//switch
	virtual bool Active(int nMode) = 0;

	//control
	virtual bool InsertChar(int c) = 0;
	virtual bool Back() = 0;
	virtual void Clear() = 0;
	virtual bool Select(int nIdx) = 0; ///<!-- true: full select, false: half select
	virtual bool SelectPy(int nIdx) = 0;
	virtual bool FocusCand(int nIdx) = 0;
	virtual bool WordPrediction(const char *strResult) = 0;
	virtual bool PageDown() = 0;
	virtual bool PageUp() = 0;

	//show
	virtual const CSGStringArray& GetPys() = 0;
	virtual const CSGStringArray& GetCands() = 0;
	virtual const CSGString& GetComp() = 0;
	virtual const CSGString& GetResult() = 0;

	virtual bool SetParam(unsigned int id, unsigned int data) = 0;
	virtual const CSGString& GetExtraInfo(unsigned int id) = 0;
	virtual bool ReloadConfig() = 0;
};

extern "C" {
CSogouShell *GetSogouShell();
void Release(CSogouShell* pShell);
}
