import moment from 'moment';

export const configureLocales = () => {
  // Update existing locales
  moment.updateLocale('es', {
    months:
      'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split(
        '_'
      ),
    monthsShort: 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
    weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
    weekdaysShort: 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
  });

  // Define new locales (if needed)
  moment.defineLocale('es-custom', {
    parentLocale: 'es',
    // Add custom locale settings here
  });
};

// Utility function to get formatted dates
export const formatDate = (date: Date | string, format: string) => {
  return moment(date).format(format);
};
