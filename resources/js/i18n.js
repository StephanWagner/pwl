// Localisations
app.locale = {
  // Errors
  errorMessageUnknown: {
    en: 'Oops, an error occured!',
    de: 'Hoppla, es ist ein Fehler ausgetreten!'
  },
  errorMessageNetwork: {
    en: 'Network error',
    de: 'Netzwerk Fehler'
  },
  successMessageItemDeleted: {
    en: 'Item deleted',
    de: 'Passwort gelöscht'
  },
  // Success
  successMessagePasswordCopied: {
    en: 'Password copied to clipboard',
    de: 'Passwort in die Zwischenablage kopiert'
  },
  successMessageDataSaved: {
    en: 'Data was saved',
    de: 'Daten gespeichert'
  }
};

// Translate strings
function __(id, rep, lang) {
  var str = app.locale[id][lang || app.language || 'en'];
  rep && jQuery.each(rep, function (index, replace) {
    str = str.replace('{' + index + '}', replace);
  });
  return str;
}
