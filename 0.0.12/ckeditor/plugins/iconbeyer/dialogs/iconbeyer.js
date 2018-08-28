CKEDITOR.dialog.add( 'iconbeyerDialog', function ( editor ) {
  return {
    title: 'Icon Settings',
    minWidth: 400,
    minHeight: 200,

    onOk: function() {
      var dialog = this;
      var icon = editor.document.createElement( 'beyer-icon' );

      icon.setAttribute(
        'name',
        dialog.getValueOf('tab-basic','name')
      );
      let selectedSize = dialog.getValueOf('tab-basic','name');
      if (selectedSize !== 'medium') {
        icon.setAttribute(selectedSize, true);
      }
      icon.setAttribute('iconset', 'pom')
      editor.insertElement( icon );

      console.log(JSON.stringify(icon))

      var event = new CustomEvent('ngComponentViaCKEditor', {'detail': icon.$});
      editor.element.$.dispatchEvent(event);
    },

    contents: [
      {
        id: 'tab-basic',
        label: 'Basic Settings',
        elements: [
          {
            type: 'text',
            id: 'name',
            label: 'Icon Name',
            validate: CKEDITOR.dialog.validate.notEmpty( "Name field cannot be empty." )
          },
          {
            type: 'select',
            id: 'size',
            label: 'Size',
            items: [
              ['small'],
              ['medium'],
              ['large']
            ]
          }
        ]
      }
    ]

  };
});