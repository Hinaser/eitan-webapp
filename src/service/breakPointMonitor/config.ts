/*
   Screen break point configuration

   When window width is smaller or equal to this `breakPoint.mobile`, `screen` is identified as 'mobile'.
   When window width is larger than `breakPoint.mobile` and less than `breakPoint.monitor`, `screen` is identified as 'tablet'
   When window width is larger or equal to `breakPoint.monitor`, `screen` is identified as 'monitor'.
   
   Please note window width will be rounded and decimal part is removed from original window width number
   when calculation for break point.
   
   i.e.
   
   when breakPoint = {mobile: 480, monitor: 481};
     then
       when window width = 360px(dp), then screen will be 'mobile'.
       when window width = 480.5px(dp), then screen will be 'mobile'
       when window width = 481px(dp), then screen will be 'monitor'.
   when breakPoint = {mobile: 480, monitor: 1000};
     then
       when window width = 481px(dp), then screen will be 'tablet'.
       when window width = 999px(dp), then screen will be 'tablet'.
       when window width = 1000px(dp), then screen will be 'monitor'.
       
*/
export const breakPoint = {
  mobile: 480,
  monitor: 1000,
};
