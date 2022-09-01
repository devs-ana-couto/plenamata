var animateValue = function( data, total ){
            
    let 
        startTimestamp = null,
        start = TriagemFase2.formPontos.totalBefore,
        end = TriagemFase2.formPontos.total,
        duration = ( end - start ) * 40
    ;

    if( duration < 0 ){
        duration = duration * -1;
    }

    const step = function( timestamp ){
        
        if( !startTimestamp ) startTimestamp = timestamp;
        
        const 
            progress = Math.min( ( timestamp - startTimestamp ) / duration, 1 ),
            valInsert = Math.floor( progress * ( end - start ) + start )
        ;
        var txtInsert = '';

        if( valInsert < 1 ){
            txtInsert = '<span></span> ' + data.labels.empty;
        }
        else if( total < 2 ){
            txtInsert = '<span>1</span> ' + data.labels.singular;
        }
        else {
            txtInsert = '<span>'+ valInsert +'</span> ' + data.labels.plural;
        }

        data.$tgt.html( txtInsert );
        
        if( progress < 1 ){
            window.requestAnimationFrame( step );
        }
    
    };
    
    window.requestAnimationFrame( step );

};