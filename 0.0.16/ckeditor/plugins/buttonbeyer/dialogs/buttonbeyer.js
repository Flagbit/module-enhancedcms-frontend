CKEDITOR.dialog.add( 'buttonbeyerDialog', function ( editor ) {
  return {
    title: 'Button Settings',
    minWidth: 400,
    minHeight: 200,

    onOk: function() {
      var dialog = this;
      var button = editor.document.createElement( 'beyer-button' );

      button.setAttribute(
        'link',
        dialog.getValueOf('tab-basic','link')
      );
      button.setAttribute(
        'type',
        dialog.getValueOf('tab-basic','type')
      );
      button.setAttribute(
        'color',
        dialog.getValueOf('tab-basic','color')
      );
      button.setAttribute(
        'icon',
        dialog.getValueOf('tab-basic','icon')
      );
      button.setText( dialog.getValueOf('tab-basic', 'text') );
      editor.insertElement( button );

      var event = new CustomEvent('ngComponentViaCKEditor', {'detail': button.$});
      editor.element.$.dispatchEvent(event);
    },

    contents: [
      {
        id: 'tab-basic',
        label: 'Basic Settings',
        elements: [
          {
            type: 'text',
            id: 'link',
            label: 'Link',
            validate: CKEDITOR.dialog.validate.notEmpty( "Link field cannot be empty." )
          },
          {
            type: 'text',
            id: 'text',
            label: 'Text',
            validate: CKEDITOR.dialog.validate.notEmpty( "Text field cannot be empty." )
          },
          {
            type: 'select',
            id: 'type',
            label: 'Type',
            items: [
              ['raised'],
              ['outline'],
              ['outline-uppercase']
            ],
            validate: CKEDITOR.dialog.validate.notEmpty( "Type field cannot be empty." )
          },
          {
            type: 'select',
            id: 'color',
            label: 'Color',
            items: [
              ['white'],
              ['orange'],
              ['red'],
              ['green'],
              ['yellow'],
              ['black']
            ],
            validate: CKEDITOR.dialog.validate.notEmpty( "Color field cannot be empty." )
          },
          {
            type: 'text',
            id: 'icon',
            label: 'Icon'
          }
        ]
      }
    ]

  };
});