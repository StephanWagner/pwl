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
  },
  successMessageUserDataSaved: {
    en: 'User data was saved',
    de: 'Benutzerdaten gespeichert'
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

// Change language
function setLocale(locale) {
  if (app.changeLocaleRequestRunning) {
    return false;
  }

  app.changeLocaleRequestRunning = true;

  $.ajax({
    url: '/changeLocaleRequest',
    method: 'post',
    data: {
      locale: locale
    },
    headers: {
      'X-CSRF-TOKEN': $('.csrf-token [name="_token"]').val()
    },
    complete: function () {
      app.changeLocaleRequestRunning = false;
    },
    success: function (response) {
      if (response && response.success) {
        window.location.reload();
        return;
      }
      error();
    },
    error: function () {
      ajaxError();
    }
  });
}
