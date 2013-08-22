<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="li">titles['<xsl:value-of select='a/text()' />'] = '<xsl:value-of select='span/text()' />';</xsl:template>

<xsl:template match='/'>
function titles() {
titles = {};
  <xsl:apply-templates select='*'/>
return titles;
}
</xsl:template>


</xsl:stylesheet>
