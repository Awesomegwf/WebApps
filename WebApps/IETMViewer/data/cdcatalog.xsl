<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fn="http://www.w3.org/2005/xpath-functions"
                xmlns:xef="http://www.libroplanta.com/xmlEditorFunctions"
                xmlns:dc="http://www.purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xls="http://www.w3.org/1999/XSL/Transform">
    <!--<xsl:variable name="refColor" select="'Blue'"></xsl:variable>-->
    <!--<xsl:template match="/">-->
    <!--<html>-->
    <!--<body>-->
    <!--<xsl:value-of select = "/dmodule/identAndStatusSection/dmAddress/dmIdent"-->
    <!--<Span style="color:{$refColor}">-->
    <!--sadf asd-->
    <!--</Span>-->
    <!--&lt;!&ndash;<Run Event="AttributeEditor" MouseCursor="Hand">ddddddddddddddddddddddddd-</Run>&ndash;&gt;-->
    <!--&lt;!&ndash;<xsl:template match="dmCode">&ndash;&gt;-->

    <!--&lt;!&ndash;</xsl:template>&ndash;&gt;-->
    <!--<h2>My CD Collection</h2>-->
    <!--<table border="1">-->
    <!--<tr bgcolor="#9acd32">-->
    <!--<th style="text-align:left">Title</th>-->
    <!--<th style="text-align:left">Artist</th>-->
    <!--</tr>-->
    <!--<xsl:for-each select="catalog/cd">-->
    <!--<tr>-->
    <!--<td><xsl:value-of select="title"/></td>-->
    <!--<td><xsl:value-of select="artist"/></td>-->
    <!--</tr>-->
    <!--</xsl:for-each>-->
    <!--</table>-->
    <!--</body>-->
    <!--</html>-->
    <!--</xsl:template>-->

    <xsl:variable name="refColor" select="'Blue'"></xsl:variable>
    <xsl:variable name="autoTextColor" select="'#2a579a'"></xsl:variable>
    <xsl:variable name="textColor" select="'Black'"></xsl:variable>
    <xsl:template match="/">

        <xsl:apply-templates/>

    </xsl:template>

    <xsl:template match="identAndStatusSection/dmAddress/dmIdent/dmCode">
        <div id="page-code">
            <Span id="page-code-0" style="color:{$autoTextColor}">
                Data module code:
            </Span>
            <Span id="page-code-1" style="color:{$refColor};cursor:pointer">
                <xls:variable name="page" select="concat(@modelIdentCode,@systemDiffCode)"></xls:variable>
                <xsl:apply-templates select="@modelIdentCode"></xsl:apply-templates> -
                <xsl:apply-templates select="@systemDiffCode"></xsl:apply-templates> -
                <xsl:apply-templates select="@systemCode"></xsl:apply-templates> -
                <xsl:apply-templates select="@subSystemCode"></xsl:apply-templates>
                <xsl:apply-templates select="@subSubSystemCode"></xsl:apply-templates> -
                <xsl:apply-templates select="@assyCode"></xsl:apply-templates> -
                <xsl:apply-templates select="@disassyCode"></xsl:apply-templates>
                <xsl:apply-templates select="@disassyCodeVariant"></xsl:apply-templates> -
                <xsl:apply-templates select="@infoCode"></xsl:apply-templates>
                <xsl:apply-templates select="@infoCodeVariant"></xsl:apply-templates> -
                <xsl:apply-templates select="@itemLocationCode"></xsl:apply-templates>
                <br/>
            </Span>
        </div>
    </xsl:template>

    <xsl:template match="identAndStatusSection/dmAddress/dmIdent/language">
        <div id="page-language">
            <span id="page-language-0" style="color:{$autoTextColor};">
                language:
                <span id="page-language-0-0" style="font-weight:bold">
                    <xsl:apply-templates select="@languageIsoCode"></xsl:apply-templates> -
                    <xsl:apply-templates select="@countryIsoCode"></xsl:apply-templates>
                </span>
            </span>
        </div>
    </xsl:template>

    <xsl:template match="identAndStatusSection/dmAddress/dmIdent/issueInfo">
        <div id="page-issueInfo">
            <span id="page-issueInfo-0" style="color:{$autoTextColor}">
                issueInfo:
                <span id="page-issueInfo-0-0" style="font-weight:bold">
                    <xsl:apply-templates select="@issueNumber"></xsl:apply-templates> -
                    <xsl:apply-templates select="@inWork"></xsl:apply-templates>
                </span>
            </span>
        </div>
    </xsl:template>

    <xsl:template match="dmAddressItems/issueDate">
        <div id="page-issueDate">
            <span id="page-issueDate-0" style="color:{$autoTextColor}">
                issueDate:
                <span id="page-issueDate-0-0" style="font-weight:bold">
                    <xsl:apply-templates select="@day"></xsl:apply-templates> -
                    <xsl:apply-templates select="@month"></xsl:apply-templates> -
                    <xsl:apply-templates select="@year"></xsl:apply-templates>
                </span>
            </span>
        </div>
    </xsl:template>

    <xsl:template match="identAndStatusSection/dmAddress/dmAddressItems/dmTitle">
        <div id="page-dmTitle">
            <span id="bookName" style="color:{$textColor};font-size:200%;text-align: center;display:block">
                <xsl:value-of select="techName"></xsl:value-of> —
                <xsl:value-of select="infoName"></xsl:value-of>
            </span>
        </div>

    </xsl:template>

    <xsl:template match="dmStatus">
        <div id="page-dmStatus">
            <span id="page-dmStatus-0" style="color:{$autoTextColor};">
                issue type :
                <span id="page-dmStatus-0-0" style="font-weight:bold">
                    <xsl:value-of select="@issueType"></xsl:value-of>
                </span>
            </span>
        </div>
        <xsl:apply-templates/>
    </xsl:template>

    <xsl:template match="security">
        <div id="page-security">
            <span id="page-security-0" style="color:{$autoTextColor};">
                security :
                <span id="page-security-0-0" style="font-weight:bold">
                    <!--<xsl:value-of select="@securityClassification"></xsl:value-of>-->
                    <xsl:if test="./@securityClassification = '01'">UNCLASSFIED</xsl:if>
                </span>
            </span>
        </div>
    </xsl:template>

    <xsl:template match="dmStatus/responsiblePartnerCompany">
        <div id="page-responsiblePartnerCompany">
            <li style="color:red;">
                <span id="page-responsiblePartnerCompany-0" style="color:{$autoTextColor};">
                    Responsible partner company:
                    <span id="page-responsiblePartnerCompany-0-0" style="font-weight:bold">
                        <xsl:value-of select="@enterpriseCode"></xsl:value-of>
                    </span>/
                    <xsl:value-of select="enterpriseName"></xsl:value-of>
                </span>
            </li>
        </div>
    </xsl:template>

    <xsl:template match="dmStatus/originator">
        <div id="page-originator">
            <li id="page-originator-0" style="color:red;">
                <span id="page-originator-0-0" style="color:{$autoTextColor};">
                    Originator:
                    <span id="page-originator-0-0-0" style="font-weight:bold">
                        <xsl:value-of select="@enterpriseCode"></xsl:value-of>
                    </span>/
                    <xsl:value-of select="enterpriseName"></xsl:value-of>
                </span>
            </li>
        </div>
    </xsl:template>

    <xsl:template match="dmStatus/applic">
        <div id="page-applic">
            <li id="page-applic-0" style="color:red;">
                <span id="page-applic-0-0" style="color:{$autoTextColor};">
                    Applicability :
                    <span id="page-applic-0-0-0" style="color:black"><br/>
                        <xsl:apply-templates/>
                    </span>
                </span>
                <!--Applicability :-->
                <!--<xsl:value-of select="displayText/simplePara"></xsl:value-of>-->
            </li>
        </div>
    </xsl:template>

    <xsl:template match="dmStatus/applic/evaluate">
        <br/>
        <div id="page-evaluate">
            <span id="page-evaluate-0" style="color:{$autoTextColor};">
                <xsl:value-of select="@andOr"></xsl:value-of><br/>
                ID:
                <span  id="page-evaluate-0-0" style="font-weight:bold">
                    <xsl:value-of select="//assert/@applicPropertyIdent"></xsl:value-of>
                </span>
                <xsl:if test=".//assert/@applicPropertyType = 'prodattr'">
                    <span id="page-evaluate-0-0-0">
                        /Type:
                        <span id="page-evaluate-0-0-0-0" style="font-weight:bold">Product attribute
                        </span>/
                    </span>
                </xsl:if>
                Values:
                <span id="page-evaluate-0-1" style="font-weight:bold">
                    <xsl:value-of select="//assert/@applicPropertyValues"></xsl:value-of>
                </span>
            </span>
        </div>
    </xsl:template>

    <xsl:template match="dmStatus/brexDmRef/dmRef/dmRefIdent/dmCode">
        <div id="page-dmcode">
            <li id="page-dmcode-0" style="color:red;">
                <span id="page-dmcode-0-0" style="color:{$autoTextColor};">
                    BREX DM Reference:
                    <span id="page-dmcode-0-0-0" style="color:{$refColor};">
                        <xsl:value-of select="@modelIdentCode"></xsl:value-of> -
                        <xsl:value-of select="@systemDiffCode"></xsl:value-of> -
                        <xsl:value-of select="@systemCode"></xsl:value-of> -
                        <xsl:value-of select="@subSystemCode"></xsl:value-of>
                        <xsl:value-of select="@subSubSystemCode"></xsl:value-of> -
                        <xsl:value-of select="@assyCode"></xsl:value-of> -
                        <xsl:value-of select="@disassyCode"></xsl:value-of>
                        <xsl:value-of select="@disassyCodeVariant"></xsl:value-of> -
                        <xsl:value-of select="@infoCode"></xsl:value-of>
                        <xsl:value-of select="@infoCodeVariant"></xsl:value-of>-
                        <xsl:value-of select="@itemLocationCode"></xsl:value-of>
                    </span>
                </span>
            </li>
        </div>
    </xsl:template>

    <xsl:template match="dmStatus/qualityAssurance/unverified">
        <div id="page-unverified">
            <li id="page-unverified-0" style="color:red;">
                <span id="page-unverified-0-0" style="color:{$autoTextColor};">
                    Quality assurance :
                </span><br/>
                <span id="page-unverified-0-1" style="color:red">
                    Unverified
                </span>

            </li>
        </div>
    </xsl:template>


    <!--标题部分-->


    <xsl:template match="content">
        <xls:if test="description">
            <div id="header">
            <xls:for-each select="description">
                <!-- add div  -->
                <!-- <div id = "page-content-big-span"> -->
                <!-- <span style="color:{$autoTextColor};"> -->
                <xls:if test="levelledPara/title = '文本编辑'">
                    <xls:for-each select="levelledPara">
                        <h1 id="page-h1">
                            <xsl:value-of select="position()"/>
                            <xsl:value-of select="title"/>
                        </h1>
                        <xsl:variable name="ref" select="position()"></xsl:variable>
                        <xsl:for-each select="levelledPara">
                            <h2 id="page-h2">
                                <xsl:value-of select="$ref"/>.
                                <xsl:value-of select="position()"/>
                                <xsl:value-of select="title"/>
                            </h2>
                            <xsl:variable name="num_1" select="position()"/>
                            <xls:if test="levelledPara">
                                <xls:for-each select="levelledPara">
                                    <h3 id="page-h3">
                                        <xsl:value-of select="$ref"/>.
                                        <xsl:value-of select="$num_1"/>.
                                        <xsl:value-of select="position()"/>
                                        <xsl:value-of select="title"/>
                                    </h3>
                                    <xsl:variable name="num_1_4" select="position()"/>
                                    <xls:if test="levelledPara">
                                        <xls:for-each select="levelledPara">
                                            <h4 id="page-h4">
                                                <xsl:value-of select="$ref"/>.
                                                <xsl:value-of select="$num_1"/>.
                                                <xsl:value-of select="$num_1_4"/>.
                                                <xsl:value-of select="position()"/>
                                                <xsl:value-of select="title"/>
                                            </h4>
                                            <xsl:variable name="num_1_5" select="position()"/>
                                            <xls:if test="levelledPara">
                                                <xls:for-each select="levelledPara">
                                                    <h5 id="page-h5">
                                                        <xsl:value-of select="$ref"/>.
                                                        <xsl:value-of select="$num_1"/>.
                                                        <xsl:value-of select="$num_1_4"/>.
                                                        <xsl:value-of select="$num_1_5"/>.
                                                        <xsl:value-of select="position()"/>
                                                        <xsl:value-of select="title"/>
                                                    </h5>
                                                </xls:for-each>
                                            </xls:if>
                                        </xls:for-each>
                                    </xls:if>
                                </xls:for-each>
                            </xls:if>
                        </xsl:for-each>
                    </xls:for-each>
                </xls:if>
                <xls:if test="levelledPara/title = '文本编辑'">
                    <xls:for-each select="levelledPara">
                        <xls:variable name="pos" select="position()"/>
                        <h1 id="page-h1-{$pos}">
                            <xsl:value-of select="$pos"/>
                            <xsl:value-of select="title"/>
                        </h1>
                        <xls:variable name="num" select="position()"></xls:variable>

                        <!--1 文本编辑-->
                        <xsl:if test="title = '文本编辑'">
                            <div id="page-content-{$pos}" style="color:black">
                                <xls:for-each select="para">
                                    <xsl:variable name="reff" select="position()"></xsl:variable>
                                    <!--<xls:value-of select="$reff"></xls:value-of>-->
                                    <xls:if test="emphasis/@emphasisType = 'em01'">
                                        <div id="page-content-{$pos}-1-0">
                                            加粗：
                                        </div>
                                        <span id="page-content-{$pos}-1" style="font-weight:bold;color:black" ><xls:value-of select="emphasis"></xls:value-of>
                                        </span><br/>
                                    </xls:if>
                                    <xls:if test="emphasis/@emphasisType = 'em02'">
                                        <div id="page-content-{$pos}-2-0">
                                            斜体：
                                        </div>
                                        <span id="page-content-{$pos}-2" style="font-style:italic;"><xls:value-of select="emphasis"></xls:value-of>
                                        </span><br/>
                                    </xls:if>
                                    <xls:if test="emphasis/@emphasisType = 'em03'">
                                        <div id="page-content-{$pos}-1-3-0">
                                            下划线：
                                        </div>
                                        <span id="page-content-{$pos}-1-3" style="text-decoration:underline;"><xls:value-of select="emphasis"></xls:value-of>
                                        </span><br/>
                                    </xls:if>
                                    <xls:if test="superScript">
                                        <div id="page-content-{$pos}-1-4-0">
                                            上下标：上标
                                        </div>
                                        <span id="page-content-{$pos}-1-4" style="vertical-align:super">
                                            <xls:value-of select="superScript"></xls:value-of>
                                        </span>
                                    </xls:if>
                                    <xls:if test="subScript">
                                        <div id="page-content-{$pos}-1-5-0">
                                            下标
                                        </div>
                                        <span id="page-content-{$pos}-1-5" style="vertical-align:sub">
                                            <xls:value-of select="subScript"></xls:value-of>
                                        </span><br/>
                                    </xls:if>
                                    <xls:if test="$reff = 5">
                                        <div id="page-content-{$pos}-1-6">
                                            <xls:value-of select="."></xls:value-of><br/>
                                        </div>
                                    </xls:if>
                                </xls:for-each>
                            </div>
                        </xsl:if>

                        <!--2列表展示-->
                        <!-- <span style="color:black"> -->
                        <xls:if test = "title = '列表展示'">
                                <xls:for-each select="para">
                                    <xsl:variable name="reff" select="position()"></xsl:variable>
                                    <xls:if test="$reff = 1">
                                        <div id="page-content-{$pos}-888">
                                            <xls:value-of select = "."></xls:value-of><br/>
                                        </div>
                                    </xls:if>
                                    <xls:if test="randomList">
                                        <div id="page-content-{$pos}-0">
                                        <span id="page-content-{$pos}-0-0" style="color:{$textColor};text-align: center;display:block">
                                            <!--<span sytle = "text-align: center;display:block">-->
                                            <xls:value-of select="randomList/title"></xls:value-of>
                                        </span><br/>
                                        </div>
                                        <xls:for-each select="randomList/listItem">
                                            <div id="page-content-{$pos}-0-0">
                                                -      <xls:value-of select="para"></xls:value-of>
                                            </div>
                                        </xls:for-each>
                                    </xls:if>

                                    <xls:if test="$reff = 3">
                                        <xsl:variable name="refff" select="."></xsl:variable>
                                        <div id="page-content-{$pos}-1">
                                        <xls:value-of select="substring($refff,1,5)"></xls:value-of><br/>
                                        </div>
                                        <span id="page-content-{$pos}-1-1" style="color:{$textColor};text-align: center;display:block">
                                            <xls:value-of select="sequentialList/title"></xls:value-of>
                                        </span><br/>
                                        <xls:for-each select = "sequentialList/listItem">
                                            <div id="page-content-{$pos}-2-0">
                                            <xsl:value-of select="position()"/>
                                            <xls:value-of select="para"></xls:value-of><br/>
                                            </div>
                                        </xls:for-each>
                                    </xls:if>

                                    <xls:if test="$reff = 4">
                                        <xsl:variable name="reffff" select="."></xsl:variable>
                                        <div id="page-content-{$pos}-2">
                                        <xls:value-of select="substring($reffff,1,6)"></xls:value-of><br/>
                                        </div>
                                        <span id="page-content-{$pos}-2-0" style="color:{$textColor};text-align: center;display:block">
                                            <xls:value-of select="definitionList/title"></xls:value-of>
                                        </span>
                                        <span id="page-content-{$pos}-2-1" style="color:{$autoTextColor}">Term title:</span>
                                        <span id="page-content-{$pos}-2-2" style="color:{$textColor};">
                                            <xls:value-of select="definitionList/definitionListHeader/termTitle"></xls:value-of>
                                        </span><br/>
                                        <span id="page-content-{$pos}-2-3" style="color:{$autoTextColor}">Definition title:</span>
                                        <span id="page-content-{$pos}-2-31" style="color:{$textColor};">
                                            <xls:value-of select="definitionList/definitionListHeader/definitionTitle"></xls:value-of>
                                        </span><br/>
                                        <xls:for-each select = "definitionList/definitionListItem">
                                            <span id="page-content-{$pos}-2-3-0" style="color:{$autoTextColor}">Term:</span>
                                            <xls:value-of select="listItemTerm"></xls:value-of><br/>
                                            <span id="page-content-{$pos}-2-3-1" style="color:{$autoTextColor}">Definition:</span>
                                            <xls:value-of select="listItemDefinition/para"></xls:value-of><br/>
                                            <!--<xls:value-of select="node-name()"></xls:value-of>-->
                                        </xls:for-each>
                                    </xls:if>

                                </xls:for-each>

                        </xls:if>
                        <!-- </span> -->

                        <!--3实体引用-->
                        <!-- <span style="color:black"> -->
                        <xsl:if test="title = '实体引用'">
                            <div id="page-content-{$pos}">
                                <xls:for-each select="para">
                                    <xsl:variable name="numm" select="position()"></xsl:variable>
                                    <xls:if test="$numm &lt;4">
                                        <div id="page-content-{$pos}-summary-{$numm}">
                                            <xls:value-of select="."/><br/>
                                        </div>
                                    </xls:if>
                                </xls:for-each>
                                <xls:for-each select="para | figure | multimedia">

                                    <!--<xls:variable name="flag" select="1"/>-->
                                    <xsl:choose>
                                        <xls:when test="symbol" >
                                            <xls:for-each select=".">
                                                <xsl:variable name="orderNum" select="position()"></xsl:variable>
                                                <div id="page-content-title-{$pos}-0-{$orderNum}">
                                                    <xls:value-of select="."></xls:value-of><br/>
                                                </div>
                                                <div id="page-content-{$pos}-0-{$orderNum}">
                                                    <xls:variable name="flag" select="2"/>
                                                    <!--<xls:value-of select="."></xls:value-of><br/>-->
                                                    <xls:variable name="tempOne" select="symbol/@infoEntityIdent"></xls:variable>
                                                    <xls:variable name="tempOneJpg" select="concat('data/src/',$tempOne,'.jpg')"></xls:variable>
                                                    <span id="page-content-{$pos}-0-0" style="color:{$textColor};text-align: center;display:block">
                                                        <img id="page-content-{$pos}-0-0-0" src="{$tempOneJpg}" ></img></span><br/>
                                                </div>
                                            </xls:for-each>
                                        </xls:when>
                                        <xls:otherwise>
                                            <xls:if test="@id = 'fig-0001'">
                                                <div id="page-content-{$pos}-1">
                                                    CGM测试
                                                    <br/>
                                                </div>
                                            </xls:if>
                                            <xls:if test="@id = 'fig-0002'">
                                                <div id="page-content-title-2">
                                                    <xls:value-of select="."></xls:value-of><br/>
                                                </div>
                                                <div id="page-content-{$pos}-2">
                                                    <xls:variable name="figTwo" select="graphic/@infoEntityIdent"></xls:variable>
                                                    <xls:variable name="figTwoTif" select="concat('data/src/',$figTwo,'.tif')"></xls:variable>
                                                    <!--<xls:value-of select="$figTwoTif"></xls:value-of>-->
                                                    <span id="page-content-{$pos}-2-0" style="color:{$textColor};text-align: center;display:block">
                                                        <img id="page-content-{$pos}-2-0-0" src="{$figTwoTif}" ></img>
                                                    </span><br/>
                                                </div>
                                            </xls:if>
                                            <xls:if test="@id = 'fig-0003'">
                                                <div id="page-content-title-3">
                                                    <xls:value-of select="."></xls:value-of><br/>
                                                </div>
                                                <div id="page-content-{$pos}-3">
                                                    <xls:variable name="figThree" select="graphic/@infoEntityIdent"></xls:variable>
                                                    <xls:variable name="figThreeJpg" select="concat('data/src/',$figThree,'.jpg')"></xls:variable>
                                                    <!--<xls:value-of select="$figThreeJpg"></xls:value-of>-->
                                                    <span id="page-content-{$pos}-3-0" style="color:{$textColor};text-align: center;display:block">
                                                        <img id="page-content-{$pos}-3-0-0" src="{$figThreeJpg}" ></img>
                                                    </span><br/>
                                                </div>
                                            </xls:if>
                                            <xls:if test="@id = 'fig-0004'">
                                                <div id="page-content-title-4">
                                                    <xls:value-of select="."></xls:value-of><br/>
                                                </div>
                                                <div id="page-content-{$pos}-4">
                                                    <xls:variable name="figFour" select="graphic/@infoEntityIdent"></xls:variable>
                                                    <xls:variable name="figFourBmp" select="concat('data/src/',$figFour,'.bmp')"></xls:variable>
                                                    <!--<xls:value-of select="$figFourBmp"></xls:value-of>-->
                                                    <span id="page-content-{$pos}-4-0" style="color:{$textColor};text-align: center;display:block">
                                                        <img id="page-content-{$pos}-4-0-0" src="{$figFourBmp}" ></img>
                                                    </span><br/>
                                                </div>
                                            </xls:if>


                                            <xls:if test="@id = 'fig-0005'">
                                                <div id="page-content-title-5">
                                                    <xls:value-of select="."></xls:value-of><br/>
                                                </div>
                                                <div id="page-content-{$pos}-5">
                                                    <xls:variable name="figFive" select="graphic/@infoEntityIdent"></xls:variable>
                                                    <xls:variable name="figFivePng" select="concat('data/src/',$figFive,'.png')"></xls:variable>
                                                    <!--<xls:value-of select="$figFivePng"></xls:value-of>-->
                                                    <span id="page-content-{$pos}-5-0" style="color:{$textColor};text-align: center;display:block">
                                                        <img id="page-content-{$pos}-5-0-0" src="{$figFivePng}" ></img>
                                                    </span><br/>
                                                </div>
                                            </xls:if>


                                            <xls:if test="@id = 'fig-0006'">
                                                <div id="page-content-title-6">
                                                    <xls:value-of select="."></xls:value-of><br/>
                                                </div>
                                                <div id="page-content-{$pos}-6">
                                                    <xls:variable name="figSix" select="graphic/@infoEntityIdent"></xls:variable>
                                                    <xls:variable name="figSixGif" select="concat('data/src/',$figSix,'.gif')"></xls:variable>
                                                    <!--<xls:value-of select="$figSixGif"></xls:value-of>-->
                                                    <span  id="page-content-{$pos}-6-0" style="color:{$textColor};text-align: center;display:block">
                                                        <img id="page-content-{$pos}-6-0-0" src="{$figSixGif}" ></img>
                                                    </span><br/>
                                                </div>
                                            </xls:if>


                                            <!--多媒体测试-->

                                            <xls:if test="@id = 'M0001'">
                                                <div id="page-content-title-m1">
                                                    <xls:value-of select="."></xls:value-of><br/>
                                                </div>
                                                <div id="page-content-{$pos}-m1">
                                                    <xls:variable name="mediaOne" select="multimediaObject/@infoEntityIdent"></xls:variable>
                                                    <xls:variable name="mediaOneSwf" select="concat('data/src/',$mediaOne,'.swf')"></xls:variable>
                                                <div id="page-content-{$pos}-m1-0">
                                                    <xls:value-of select="$mediaOneSwf"></xls:value-of>
                                                </div>
                                                    <!--<span style="color:{$textColor};text-align: center;display:block">-->
                                                    <!--<img src="{$mediaOneSwf}" ></img>-->
                                                    <!--<embed src="{$mediaOneSwf}"/>-->
                                                    <!--<embed type="application/x-shockwave-flash" src="{$mediaOneSwf}"/>-->
                                                    <embed id="page-content-{$pos}-m1" height="600" width="900" src="{$mediaOneSwf}" type="application/x-shockwave-flash" ></embed>
                                                    <!--</span><br/>-->
                                                    <br/>
                                                </div>
                                            </xls:if>


                                            <xls:if test="@id = 'M0002'">
                                                <div id="page-content-title-m2">
                                                    <xls:value-of select="."></xls:value-of><br/>
                                                </div>
                                                <div id="page-content-{$pos}-m2">
                                                    <xls:variable name="mediaTwo" select="multimediaObject/@infoEntityIdent"></xls:variable>
                                                    <xls:variable name="mediaTwoWrl" select="concat($mediaTwo,'.wrl')"></xls:variable>
                                                <div id="page-content-{$pos}-m2-0">
                                                    <xls:value-of select="$mediaTwoWrl"></xls:value-of>
                                                </div>
                                                    <!--<span style="color:{$textColor};text-align: center;display:block">-->
                                                    <img id="page-content-{$pos}-m2-0" src="{$mediaTwoWrl}" ></img>
                                                    <!--<embed src="{$mediaOneSwf}"/>-->
                                                    <!--<embed type="application/x-shockwave-flash" src="{$mediaOneSwf}"/>-->
                                                    <!--<embed height="600" width="900" src="{$mediaTwoWrl}" type="application/x-shockwave-flash" ></embed>-->
                                                    <!--</span><br/>-->
                                                    <br/>
                                                </div>
                                            </xls:if>


                                            <xls:if test="@id = 'M0003'">
                                                <div id="page-content-title-m3">
                                                    <xls:value-of select="."></xls:value-of><br/>
                                                </div>
                                                <div id="page-content-{$pos}-m3">
                                                    <xls:variable name="mediaThree" select="multimediaObject/@infoEntityIdent"></xls:variable>
                                                    <xls:variable name="mediaThreeWmv" select="concat($mediaThree,'.wmv')"></xls:variable>
                                                    <!--<object width="200" height="180" classid="CLSID:22d6f312-b0f6-11d0-94ab-0080c74c7e95" codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,4,5,715" standby="Loading Microsoft Windows Media Player components..." type="application/x-oleobject" hspace="5">-->
                                                    <!--<param name="AutoRewind" value="1"/>-->
                                                    <!--<param name="FileName" value="{$mediaThreeWmv}"/>-->
                                                    <!--<param name="ShowControls" value="1"/>-->
                                                    <!--<param name="ShowPositionControls" value="0"/>-->
                                                    <!--<param name="ShowAudioControls" value="1"/>-->
                                                    <!--<param name="ShowTracker" value="0"/>-->
                                                    <!--<param name="ShowDisplay" value="0"/>-->
                                                    <!--<param name="ShowStatusBar" value="0"/>-->
                                                    <!--<param name="ShowGotoBar" value="0"/>-->
                                                    <!--<param name="ShowCaptioning" value="0"/>-->
                                                    <!--<param name="AutoStart" value="1"/>-->
                                                    <!--<param name="Volume" value="5000"/>-->
                                                    <!--<param name="AnimationAtStart" value="0"/>-->
                                                    <!--<param name="TransparentAtStart" value="0"/>-->
                                                    <!--<param name="AllowChangeDisplaySize" value="0"/>-->
                                                    <!--<param name="AllowScan" value="0"/>-->
                                                    <!--<param name="EnableContextMenu" value="0"/>-->
                                                    <!--<param name="ClickToPlay" value="0"/>-->
                                                    <!--</object>-->
                                                    <!--<video src="{$mediaThreeWmv}" controls="controls">-->
                                                    <!--您的浏览器不支持 video 标签。-->
                                                    <!--</video>-->
                                                    <embed id="page-content-{$pos}-m3-0-0" src="{$mediaThreeWmv}"/>
                                                    <br/>
                                                <div id="page-content-{$pos}-m3-0">
                                                    <xls:value-of select="$mediaThreeWmv"></xls:value-of>
                                                </div>
                                                    <br/>
                                                </div>
                                            </xls:if>


                                            <xls:if test="@id = 'M0004'">
                                                <div id="page-content-title-m4">
                                                    <xls:value-of select="."></xls:value-of><br/>
                                                </div>
                                                <div id="page-content-{$pos}-m4">
                                                    <xls:variable name="mediaFour" select="multimediaObject/@infoEntityIdent"></xls:variable>
                                                    <xls:variable name="mediaFourPvz" select="concat($mediaFour,'.pvz')"></xls:variable>
                                                <div id="page-content-{$pos}-m4-0">
                                                    <xls:value-of select="$mediaFourPvz"></xls:value-of>
                                                </div>
                                                    <!--<span style="color:{$textColor};text-align: center;display:block">-->
                                                    <!--<img src="{$mediaTwoWrl}" ></img>-->
                                                    <!--<embed src="{$mediaFourPvz}"/>-->
                                                    <!--<audio src="{$mediaFourPvz}" controls="controls">-->
                                                    <!--Your browser does not support the audio element.-->
                                                    <!--</audio>-->
                                                    <!--<embed type="application/x-shockwave-flash" src="{$mediaOneSwf}"/>-->
                                                    <!--<embed height="600" width="900" src="{$mediaTwoWrl}" type="application/x-shockwave-flash" ></embed>-->
                                                    <!--</span><br/>-->
                                                    <br/>
                                                </div>
                                            </xls:if>


                                            <xls:if test="@id = 'M0005'">
                                                <div id="page-content-title-m5">
                                                    <xls:value-of select="."></xls:value-of><br/>
                                                </div>
                                                <div id="page-content-{$pos}-m5">
                                                    <xls:variable name="mediaFive" select="multimediaObject/@infoEntityIdent"></xls:variable>
                                                    <xls:variable name="mediaFiveMp3" select="concat('data/src/',$mediaFive,'.mp3')"></xls:variable>
                                                    <span id="page-content-{$pos}-m5-0">
                                                        <audio id="page-content-{$pos}-m5-0-0" src="{$mediaFiveMp3}" controls="controls">
                                                            Your browser does not support the audio element.
                                                        </audio>
                                                    </span>
                                                    <br/>
                                                <div id="page-content-{$pos}-m5-1">
                                                    <xls:value-of select="$mediaFiveMp3"></xls:value-of>
                                                </div>
                                                    <br/>
                                                </div>
                                            </xls:if>


                                            <xls:if test="@id = 'M0006'">
                                                <div id="page-content-title-m6">
                                                    <xls:value-of select="."></xls:value-of><br/>
                                                </div>
                                                <div id="page-content-{$pos}-m6">
                                                    <xls:variable name="mediaSix" select="multimediaObject/@infoEntityIdent"></xls:variable>
                                                    <xls:variable name="mediaSixMpeg" select="concat($mediaSix,'.mpeg')"></xls:variable>
                                                    <!--<video src="{$mediaSixMpeg}" controls="controls">-->
                                                    <!--您的浏览器不支持 video 标签。-->
                                                    <!--</video>-->
                                                    <embed id="page-content-{$pos}-m6-0" src="{$mediaSixMpeg}"/>
                                                    <br/>
                                                    <div id="page-content-{$pos}-m6-0">
                                                        <xls:value-of select="$mediaSixMpeg"></xls:value-of>
                                                    </div>
                                                    <br/>
                                                </div>
                                            </xls:if>


                                            <xls:if test="@id = 'M0007'">
                                                <div id="page-content-title-m7">
                                                    <xls:value-of select="."></xls:value-of><br/>
                                                </div>
                                                <div id="page-content-{$pos}-m7">
                                                    <xls:variable name="mediaServen" select="multimediaObject/@infoEntityIdent"></xls:variable>
                                                    <xls:variable name="mediaSevenDoc" select="concat($mediaServen,'.doc')"></xls:variable>
                                                    <!--<video src="{$mediaSevenDoc}" controls="controls">-->
                                                    <!--您的浏览器不支持 video 标签。-->
                                                    <!--</video>-->
                                                    <!--<br/>-->
                                                    <div id="page-content-{$pos}-m7-0">
                                                        <xls:value-of select="$mediaSevenDoc"></xls:value-of>
                                                    </div>
                                                    <embed id="page-content-{$pos}-m7" src="{$mediaSevenDoc}"/>
                                                    <br/>
                                                </div>
                                            </xls:if>


                                            <xls:if test="@id = 'M0008'">
                                                <div id="page-content-title-m8">
                                                    <xls:value-of select="."></xls:value-of><br/>
                                                </div>
                                                <div id="page-content-{$pos}-m8">
                                                    <xls:variable name="mediaEight" select="multimediaObject/@infoEntityIdent"></xls:variable>
                                                    <xls:variable name="mediaEightPdf" select="concat($mediaEight,'.pdf')"></xls:variable>
                                                    <!--<video src="{$mediaSevenDoc}" controls="controls">-->
                                                    <!--您的浏览器不支持 video 标签。-->
                                                    <!--</video>-->
                                                    <!--<br/>-->
                                                    <!--<embed width="800" height="600" src="$mediaEightPdf"> </embed>-->
                                                    <!--<iframe src="$mediaEightPdf" width="800" height="600"></iframe>-->
                                                    <!--<object classid="class:CA8A9780-280D-11CF-A24D-444553540000" width="800" height="600" border="0">-->
                                                    <!--<param name="SRC" value="$mediaEightPdf"/>-->
                                                    <!--</object>-->
                                                    <!--<object classid="clsid:CA8A9780-280D-11CF-A24D-444553540000" width="100%" height="100%" border="0">&lt;!&ndash;IE&ndash;&gt;-->
                                                    <!--<param name="_Version" value="65539"/>-->
                                                    <!--<param name="_ExtentX" value="20108"/>-->
                                                    <!--<param name="_ExtentY" value="10866"/>-->
                                                    <!--<param name="_StockProps" value="0"/>-->
                                                    <!--<param name="SRC" value="testing_pdf.pdf"/>-->
                                                    <!--<embed src="$mediaEightPdf" width="100%" height="800" href="testing_pdf.pdf"></embed>&lt;!&ndash;FF&ndash;&gt;-->
                                                    <!--</object>-->
                                                    <div id="page-content-{$pos}-m8-0">
                                                        <xls:value-of select="$mediaEightPdf"></xls:value-of>
                                                    </div>
                                                    <a  href="$mediaEightPdf"  target="_blank">open a.doc </a>
                                                    <iframe src="$mediaEightPdf" with="" height="" scroll="no"></iframe>
                                                    <embed src="{$mediaEightPdf}"/>
                                                    <br/>
                                                </div>
                                            </xls:if>

                                        </xls:otherwise>
                                    </xsl:choose>
                                    <!--<xls:value-of select = "."></xls:value-of><br/>-->
                                </xls:for-each>
                            </div>

                        </xsl:if>
                        <!-- </span> -->

                        <!--4热点交互-->
                        <!-- <span style="color:black"> -->
                        <xls:if test="title = '热点交互'">
                            <div id="page-content-{$pos}">
                                <xls:for-each select="para">
                                    <div id="page-content-{$pos}-0">
                                        <xls:value-of select="."></xls:value-of><br/>
                                    </div>
                                </xls:for-each>
                                <xls:for-each select="levelledPara">
                                    <xsl:variable name="temp" select="title"></xsl:variable>
                                    <xls:variable name="tempNo" select="position()"></xls:variable>
                                    <xls:variable name="name" select="concat($num,'.',$tempNo,$temp)"></xls:variable>
                                    <xsl:value-of select="$name"></xsl:value-of><br/>
                                    <xls:if test="figure">
                                        figure:<xls:value-of select="title"></xls:value-of><br/>
                                        <xls:for-each select="figure/graphic">
                                            <span style="color:{$autoTextColor};text-align: center;display:block">
                                                <xls:value-of select="@infoEntityIdent"></xls:value-of><br/>
                                            </span>
                                            <xls:for-each select="hotspot">
                                                <xls:choose>
                                                    <xls:when test="internalRef">
                                                        Hotspot:[Application structure id:<xls:value-of select="@applicationStructureIdent"></xls:value-of>]
                                                        [Application structure name:<xls:value-of select="@applicationStructureName"></xls:value-of>]
                                                        <xls:variable name="refId" select="internalRef/@internalRefId"/>
                                                        <xls:value-of select="$refId"/><br/>
                                                    </xls:when>
                                                    <xsl:otherwise>
                                                        Hotspot:[Application structure id:<xls:value-of select="@applicationStructureIdent"></xls:value-of>]
                                                        [Application structure name:<xls:value-of select="@applicationStructureName"></xls:value-of>]
                                                        <br/>
                                                    </xsl:otherwise>
                                                </xls:choose>
                                            </xls:for-each>
                                        </xls:for-each>
                                    </xls:if>
                                    <xls:for-each select="para">
                                        <xls:value-of select="."/><br/>
                                    </xls:for-each>
                                </xls:for-each>
                            </div>
                        </xls:if>
                        <!-- </span> -->

                        <!--5标题展示-->
                        <!-- <span style="color:black"> -->
                        <xls:if test="title = '标题展示：一级段标题'">
                            <div id="page-content-{$pos}">
                                <xls:if test="levelledPara">
                                    <xls:for-each select="levelledPara">
                                        <xls:variable name="num_1" select="position()"/>
                                        <xls:value-of select="$num"/>.
                                        <xls:value-of select="$num_1"/>
                                        <xls:value-of select="title"/><br/>

                                        <xls:if test="levelledPara">
                                            <xls:for-each select="levelledPara">
                                                <xls:variable name="num_1_1" select="position()"/>
                                                <xls:value-of select="$num"/>.
                                                <xls:value-of select="$num_1"/>.
                                                <xls:value-of select="$num_1_1"/>
                                                <xls:value-of select="title"/><br/>

                                                <xls:if test="levelledPara">
                                                    <xls:for-each select="levelledPara">
                                                        <xls:variable name="num_1_1_1" select="position()"/>
                                                        <xls:value-of select="$num"/>.
                                                        <xls:value-of select="$num_1"/>.
                                                        <xls:value-of select="$num_1_1"/>.
                                                        <xls:value-of select="$num_1_1_1"/>
                                                        <xls:value-of select="title"/><br/>

                                                        <xls:if test="levelledPara">
                                                            <xls:for-each select="levelledPara">
                                                                <xls:variable name="num_1_1_1_1" select="position()"/>
                                                                <xls:value-of select="$num"/>.
                                                                <xls:value-of select="$num_1"/>.
                                                                <xls:value-of select="$num_1_1"/>.
                                                                <xls:value-of select="$num_1_1_1"/>.
                                                                <xls:value-of select="$num_1_1_1_1"/>
                                                                <xls:value-of select="title"/><br/>
                                                            </xls:for-each>
                                                        </xls:if>

                                                    </xls:for-each>
                                                </xls:if>

                                            </xls:for-each>
                                        </xls:if>

                                    </xls:for-each>
                                </xls:if>
                            </div>
                        </xls:if>
                        <!-- </span> -->

                        <!--6多级列表展示-->
                        <!-- <span style="color:black"> -->
                        <xls:if test="title = '多级列表展示'">
                            <div id="page-content-{$pos}">
                                <xls:for-each select="para">
                                    <xls:choose>
                                        <xls:when test="sequentialList | randomList">
                                            <xls:if test="sequentialList">
                                                <div id="page-content-{$pos}-0">
                                                <ol id="page-content-{$pos}-0-0">
                                                    <xls:for-each select="sequentialList/listItem">
                                                        <li id="page-content-{$pos}-0-0-0">
                                                            <xls:value-of select="para"/><br/>
                                                        </li>
                                                        <xls:if test="para/sequentialList">
                                                            <ol id="page-content-{$pos}-0-0-0-0">
                                                                <xls:for-each select="para/sequentialList/listItem">
                                                                    <li id="page-content-{$pos}-0-0-0-0-0">
                                                                        <xls:value-of select="para"/>
                                                                    </li>
                                                                </xls:for-each>
                                                            </ol>
                                                        </xls:if>
                                                    </xls:for-each>
                                                </ol>
                                                </div>
                                            </xls:if>
                                            <xls:if test="randomList">
                                                <div id="page-content-{$pos}-1">
                                                <ul id="page-content-{$pos}-1-0">
                                                    <xls:for-each select="randomList/listItem">
                                                        <li id="page-content-{$pos}-1-0-0">
                                                            <xls:value-of select="para"/><br/>
                                                        </li>
                                                        <xls:if test="para/randomList">
                                                            <ul id="page-content-{$pos}-1-0-0-0">
                                                                <xls:for-each select="para/randomList/listItem">
                                                                    <li id="page-content-{$pos}-1-0-0-0-0">
                                                                        <xls:value-of select="para"/><br/>
                                                                    </li>
                                                                    <xls:if test="para/randomList">
                                                                        <ul id="page-content-{$pos}-1-0-0-0-0-0">
                                                                            <xls:for-each select="para/randomList/listItem">
                                                                                <li id="page-content-{$pos}-1-0-0-0-0-0-0">
                                                                                    <xls:value-of select="para"/><br/>
                                                                                </li>
                                                                            </xls:for-each>
                                                                        </ul>
                                                                    </xls:if>
                                                                </xls:for-each>
                                                            </ul>
                                                        </xls:if>
                                                    </xls:for-each>
                                                </ul>
                                                </div>
                                                <!--<xls:value-of select="."/><br/>-->
                                            </xls:if>
                                        </xls:when>
                                        <xls:otherwise>
                                            <xls:value-of select="."/><br/>
                                        </xls:otherwise>
                                    </xls:choose>
                                </xls:for-each>
                            </div>
                        </xls:if>
                        <!-- </span> -->

                        <!--7颜色标注和适用性-->
                        <!-- <span style="color:black"> -->
                        <xls:if test="title = '颜色标注和适用性'">
                            <div id="page-content-{$pos}">
                                <xls:for-each select="para">
                                    <xls:choose>
                                        <xls:when test="sequentialList|captionGroup">
                                            <xls:if test="sequentialList">
                                                <ol id="page-content-{$pos}-0" style="background:#66CCCC">
                                                    <xls:for-each select="sequentialList/listItem">
                                                        <li id="page-content-{$pos}-0-0">
                                                            <xls:value-of select="para"/>
                                                        </li>
                                                    </xls:for-each>
                                                </ol>
                                            </xls:if>
                                            <xls:if test="captionGroup">
                                                <table  id="page-content-{$pos}-1" width="100%" border="1">
                                                    <xls:if test="captionGroup/@cols = '2'">
                                                        <xls:for-each select="captionGroup/captionBody/captionRow">
                                                            <tr id="page-content-{$pos}-1-0">
                                                                <xsl:for-each select="captionEntry">
                                                                    <xls:variable name="colNa" select="caption/@color"/>
                                                                    <!--<xls:value-of select="$colNa"></xls:value-of>-->
                                                                    <xls:if test="$colNa = 'co04'">
                                                                        <td id="page-content-{$pos}-1-0-0" bgcolor="red">
                                                                            <xsl:value-of select="caption/captionLine"/>
                                                                        </td>
                                                                    </xls:if>
                                                                    <xls:if test="$colNa = 'co03'">
                                                                        <td  id="page-content-{$pos}-1-0-1" bgcolor="yellow">
                                                                            <xsl:value-of select="caption/captionLine"/>
                                                                        </td>
                                                                    </xls:if>
                                                                    <xls:if test="$colNa = 'co01'">
                                                                        <td id="page-content-{$pos}-1-0-2" bgcolor="green">
                                                                            <xsl:value-of select="caption/captionLine"/>
                                                                        </td>
                                                                    </xls:if>
                                                                </xsl:for-each>
                                                            </tr>
                                                            <!--<xls:if test="">-->

                                                            <!--</xls:if>-->
                                                        </xls:for-each>
                                                    </xls:if>

                                                </table>
                                            </xls:if>

                                        </xls:when>
                                        <xls:otherwise>
                                            <xls:value-of select="."/><br/>
                                        </xls:otherwise>
                                    </xls:choose>

                                </xls:for-each>
                            </div>
                        </xls:if>
                        <!-- </span> -->

                        <!--8表格展示-->
                        <!-- <span style="color:black"> -->
                        <xls:if test="title = '表格展示'">
                            <div id="page-content-{$pos}">
                                <xls:for-each select="para|table">
                                    <xls:if test="name() = 'para'">
                                        <div id="page-content-{$pos}-0">
                                        <xls:value-of select="."/><br/>
                                        </div>
                                    </xls:if>
                                    <xls:if test="tgroup">
                                        <xls:for-each select="tgroup">
                                            <table id="page-content-{$pos}-1" width="100%" border="1">
                                                <xls:if test="thead">
                                                    <tr id="page-content-{$pos}-1-0" style="background-color:#00BFFF">
                                                        <xls:for-each select="thead/row/entry">
                                                            <xls:choose>
                                                                <xls:when test="@nameend='col2'">
                                                                    <td id="page-content-{$pos}-1-0-0" colspan="2" style="text-align:center">
                                                                        <xls:value-of select="para"/>
                                                                    </td>
                                                                </xls:when>
                                                                <xls:otherwise>
                                                                    <td id="page-content-{$pos}-1-0-1" style="text-align:center">
                                                                        <xls:value-of select="para"/>
                                                                    </td>
                                                                </xls:otherwise>
                                                            </xls:choose>
                                                        </xls:for-each>
                                                    </tr>
                                                </xls:if>
                                                <xls:for-each select="tbody/row">
                                                    <tr id="page-content-{$pos}-1-1">
                                                        <xls:for-each select="entry">
                                                            <xls:choose>
                                                                <xls:when test="@nameend='col2'">
                                                                    <td id="page-content-{$pos}-1-1-0" colspan="2" style="text-align:center">
                                                                        <xls:value-of select="para"/>
                                                                    </td>
                                                                </xls:when>
                                                                <xls:otherwise>
                                                                    <td id="page-content-{$pos}-1-1-1" style="text-align:center">
                                                                        <xls:value-of select="para"/>
                                                                    </td>
                                                                </xls:otherwise>
                                                            </xls:choose>
                                                        </xls:for-each>
                                                    </tr>
                                                </xls:for-each>
                                            </table>
                                        </xls:for-each>
                                    </xls:if>

                                </xls:for-each>
                            </div>
                        </xls:if>
                        <!-- </span> -->

                        <!--9注-->
                        <!-- <span style="color:black"> -->
                        <xls:if test="title='注'">
                            <div id="page-content-{$pos}">
                                <xls:for-each select="para|note">
                                    <xls:if test="name()= 'para'">
                                        <div id="page-content-{$pos}-0">
                                        <xls:value-of select="."/><br/>
                                        </div>
                                    </xls:if>
                                    <xls:if test="name()='note'">
                                        <div id="page-content-{$pos}-1">
                                        <xls:value-of select="name()"/>:<br/>
                                        <xls:value-of select="."/><br/>
                                        </div>
                                    </xls:if>
                                </xls:for-each>
                            </div>
                        </xls:if>
                        <!-- </span> -->

                        <!--10-->
                        <!-- <span style="color:black"> -->
                        <xls:if test="title='引用链接展示'">
                            <div id="page-content-{$pos}">
                                <!--<xls:value-of select="."/><br/>-->
                                <xls:for-each select="para">
                                    <div id="page-content-{$pos}-0">
                                    <xls:value-of select="."/><br/>
                                    </div>
                                    <!--<xls:for-each select=""-->
                                </xls:for-each>
                            </div>
                        </xls:if>
                        <!-- </span> -->

                    </xls:for-each>
                </xls:if>
                <!--<xsl:apply-templates/>-->

                <!--匹配第二个xml-->
                <xls:if test="levelledPara/figure/@id = 'F0001'">
                    <span style="color:black">
                        <xls:for-each select="levelledPara/para|levelledPara/figure">
                            <xls:if test="name() = 'para'">
                                <xls:value-of select="."/><br/>
                            </xls:if>
                            <xls:if test="name()='figure'">
                                <xls:value-of select="name()"/>
                                <xls:value-of select="title"/><br/>
                                <xls:value-of select="graphic/@infoEntityIdent"/><br/>
                                Hotspot:[Application structure id:<xls:value-of select="graphic/hotspot/@applicationStructureIdent"/>]
                                [Application structure name:<xls:value-of select="graphic/hotspot/@applicationStructureName"/>]
                                <xls:value-of select="graphic/hotspot/dmRef/dmRefIdent/dmCode/@modelIdentCode"/>
                            </xls:if>
                        </xls:for-each>
                    </span>
                </xls:if>
                <!-- </span> -->
                <!-- </div> -->
                <!-- add div  -->

            </xls:for-each>
            </div>
        </xls:if>

        <!--定期检查-->
        <xls:if test="maintPlanning">
            <xls:for-each select="refs/dmRef/dmRefIdent/dmCode">
                <Span style="color:{$refColor}">
                    <xls:value-of select="@modelIdentCode"/> -
                    <xls:value-of select="@systemDiffCode"/> -
                    <xls:value-of select="@systemCode"/>-
                    <xls:value-of select="@subSystemCode"/>
                    <xls:value-of select="@subSubSystemCode"/>-
                    <xls:value-of select="@assyCode"/> -
                    <xls:value-of select="@disassyCode"/>
                    <xls:value-of select="@disassyCodeVariant"/> -
                    <xls:value-of select="@infoCode"/>
                    <xls:value-of select="@infoCodeVariant"/> -
                    <xls:value-of select="@itemLocationCode"/>
                </Span>
            </xls:for-each> [
            <xls:value-of select="refs/dmRef/dmRefAddressItems/dmTitle/techName"/>-
            <xls:value-of select="refs/dmRef/dmRefAddressItems/dmTitle/infoName"/>]<br/>
            <xls:if test="maintPlanning">
                <xls:for-each select="maintPlanning">
                    <span style="font-style:italic;color:{$autoTextColor};font-size:80%;text-align: center;display:block">
                        <xsl:value-of select="name()"></xsl:value-of>
                    </span>
                    <xls:for-each select="taskDefinition">
                        <xls:value-of select="name()"/><br/>
                        <xls:if test="@skillType='st01'">  Skill type:Airframe(AIRRL)<br/></xls:if>
                        <xls:if test="@taskIdent">Task ident:
                            <span style="color:red">
                                <xls:value-of select="@taskIdent"/>
                            </span><br/>
                        </xls:if>
                        <xls:if test="task">
                            Task:<br/>
                            <xls:if test="task/taskDescr">
                                Task description:<br/>
                                <xls:value-of select="task/taskDescr"/><br/>
                            </xls:if>
                        </xls:if>
                        <xls:for-each select="preliminaryRqmts">
                            <span style="font-style:italic;color:{$autoTextColor};font-size:80%;text-align: center;display:block">
                                <xsl:value-of select="name()"></xsl:value-of>
                            </span>
                            <xls:if test="reqCondGroup">
                                Required conditions<br/>
                                <xls:if test="reqCondGroup/noConds">
                                    none<br/>
                                </xls:if>
                            </xls:if>

                            <xls:if test="reqPersons">
                                Required conditions<br/>
                                <xls:for-each select="reqPersons/person">
                                    Person:<xls:value-of select="@man"/><br/>
                                    Category:<xls:value-of select="personCategory/@personCategoryCode"/><br/>
                                    Trade:<xls:value-of select="trade"/><br/>
                                    Estimated time:<xls:value-of select="estimatedTime"/><xls:value-of select="estimatedTime/@unitOfMeasure"/><br/>
                                </xls:for-each>
                            </xls:if>

                            <xls:if test="reqSupportEquips">
                                Support equipment<br/>
                                <xls:for-each select="reqSupportEquips/supportEquipDescrGroup/supportEquipDescr">
                                    Equipment:<br/>
                                    Name:<xls:value-of select="name"/><br/>
                                    <xls:if test="identNumber">Identification number:<br/></xls:if>
                                    <xls:if test="identNumber/manufacturerCode">Manufactorer code:<br/></xls:if>
                                    <xls:if test="identNumber/partAndSerialNumber">Part and serial number:<br/></xls:if>
                                    <xls:if test="identNumber/partAndSerialNumber/partNumber">Part number:
                                        <xls:value-of select="identNumber/partAndSerialNumber/partNumber"/><br/>
                                    </xls:if>
                                    <xls:if test="reqQuantity">Quantity:<br/><xls:value-of select="reqQuantity"/>
                                        <xls:value-of select="reqQuantity/@unitOfMeasure"/><br/></xls:if>
                                </xls:for-each>
                            </xls:if>

                            <xls:if test="reqSupplies">
                                Consumables,materials and expendables<br/>
                                <xls:for-each select="reqSupplies/supplyDescrGroup/supplyDescr">
                                    Supply:<br/>
                                    <xls:if test="name">Name:<xls:value-of select="name"></xls:value-of><br/></xls:if>
                                    <xls:if test="identNumber">Identification number:<br/></xls:if>
                                    <xls:if test="identNumber/manufacturerCode">Manufactorer code:<br/></xls:if>
                                    <xls:if test="identNumber/partAndSerialNumber">Part and serial number:<br/></xls:if>
                                    <xls:if test="identNumber/partAndSerialNumber/partNumber">Part number:
                                        <xls:value-of select="identNumber/partAndSerialNumber/partNumber"/><br/>
                                    </xls:if>
                                    <xls:if test="reqQuantity">Quantity:<br/><xls:value-of select="reqQuantity"/>
                                        <xls:value-of select="reqQuantity/@unitOfMeasure"/><br/></xls:if>
                                </xls:for-each>
                            </xls:if>

                            <xls:if test="reqSpares">
                                Spares<br/>
                                <xls:for-each select="reqSpares/spareDescrGroup/spareDescr">
                                    Spare:<br/>
                                    <xls:if test="name">Name:<xls:value-of select="name"></xls:value-of><br/></xls:if>
                                    <xls:if test="identNumber">Identification number:<br/></xls:if>
                                    <xls:if test="identNumber/manufacturerCode">Manufactorer code:<br/></xls:if>
                                    <xls:if test="identNumber/partAndSerialNumber">Part and serial number:<br/></xls:if>
                                    <xls:if test="identNumber/partAndSerialNumber/partNumber">Part number:
                                        <xls:value-of select="identNumber/partAndSerialNumber/partNumber"/><br/>
                                    </xls:if>
                                    <xls:if test="reqQuantity">Quantity:<br/><xls:value-of select="reqQuantity"/>
                                        <xls:value-of select="reqQuantity/@unitOfMeasure"/><br/></xls:if>
                                </xls:for-each>
                            </xls:if>

                            <xls:if test="reqSafety">
                                Safety conditions<br/>
                                <xls:if test="reqSafety/noSafety">
                                    None<br/>
                                </xls:if>
                            </xls:if>

                        </xls:for-each>

                        <xls:if test="limit">
                            Inspection definition<br/>
                            <xls:if test="limit/threshold">
                                <xls:value-of select="limit/threshold/@thresholdType"/>:
                                <xls:value-of select="limit/threshold/thresholdValue"/>W<br/>
                            </xls:if>

                            <xls:if test="limit/limitRange">
                                limit range:<br/>
                                <xls:if test="limit/limitRange/limitRangeFrom">
                                    From:<xls:value-of select="limit/limitRange/limitRangeFrom/threshold/@thresholdType"/>:
                                    <xls:value-of select="limit/limitRange/limitRangeFrom/threshold/thresholdValue"/><br/>
                                    To:<xls:value-of select="limit/limitRange/limitRangeTo/threshold/@thresholdType"/>:
                                    <xls:value-of select="limit/limitRange/limitRangeTo/threshold/thresholdValue"/><br/>
                                </xls:if>
                            </xls:if>

                            <xls:if test="remarks">
                                remark:<br/>
                                <xls:value-of select="remarks/simplePara"/><br/>
                            </xls:if>

                        </xls:if>




                    </xls:for-each>
                </xls:for-each>
            </xls:if>
        </xls:if>

        <xls:if test="faultIsolation">
            444
        </xls:if>

        <xls:if test="procedure">
            555
        </xls:if>


        <xls:if test="illustratedPartsCatalog">
            666
        </xls:if>




        <br />
    </xsl:template>












    <!--<xsl:template match="description">-->
    <!--<span style="color:{$autoTextColor};">-->
    <!--<xls:for-each select="levelledPara">-->
    <!--<xsl:value-of select="position()"/>-->
    <!--<xsl:value-of select="title"/><br/>-->
    <!--</xls:for-each>-->

    <!--</span>-->
    <!--<br />-->
    <!--</xsl:template>-->


    <!--<xsl:template match="description">-->

    <!--</xsl:template>-->







</xsl:stylesheet>
