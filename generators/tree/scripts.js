let cnvs, ctx, leaves
window.onload = ( ) => {
  draw( )
}

window.onkeyup = draw

function draw( ) {
  cnvs = document.querySelector( "#branches" )
  ctx = cnvs.getContext( "2d" )
  ctx.clearRect( 0, 0, 1000, 1000 )
  ctx.lineCap = "round"
  leaves = [ ]
  tree( )
  cnvs = document.querySelector( "#leaves" )
  ctx = cnvs.getContext( "2d" )
  ctx.clearRect( 0, 0, 1000, 1000 )
  ctx.fillStyle = "#272"
  folliate( )
  zipper( )
}

function tree( x = 500, y = 750, a = -Math.PI/2, s = 45, ta = 0, tas = 0, c = [ 90, 50, 10 ] ) {
  let scsv = ( Math.random( ) - 0.5 ) * 0.03
  if ( tas == 0 ) {
    ta = 0.05 * ( Math.random( ) - 0.5 ) + ta
  } else {
    ta = tas * 0.1 * Math.random( )
  }
  let tillnextbranch = Math.round( Math.random( ) * 8 ) + 4
  ctx.strokeStyle = "#" + c[ 0 ].toString( 16 ).padStart( 2, 0 ) + c[ 1 ].toString( 16 ).padStart( 2, 0 ) + c[ 2 ].toString( 16 ).padStart( 2, 0 )
  while ( s >= 1 ) {
    ctx.lineWidth = s
    ctx.beginPath( )
    ctx.moveTo( x, y )
    x += 10 * Math.cos( a )
    y += 10 * Math.sin( a )
    a += ta
    if ( s >= 10 ) {
      s *= ( 0.95 + scsv )
    } else {
      s --
    }
    ctx.lineTo( x, y )
    ctx.stroke( )
    //Branch
    tillnextbranch --
    if ( tillnextbranch <= 0 ) {
      let sgn = Math.sign( Math.random( ) - 0.5 )
      tree( x, y, a, s, ta, -1 * sgn, c.map( x => Math.round( x / 1.075 ) ) )
      tree( x, y, a, s, ta, 1 * sgn, c.map( x => Math.round( x * 1.075 ) ) )
      return
    }
  }
  leaves.push( { x, y } )
}

function folliate( ) {
  for ( let i = 0; i < leaves.length; i++ ) {
    ctx.beginPath( )
    ctx.arc( leaves[ i ].x, leaves[ i ].y, ( Math.random( ) * 50 ) + 75, 0, 2 * Math.PI )
    ctx.fill( )
  }
}

function zipper( ) {
  mcnvs = document.querySelector( "#main" )
  ctx = mcnvs.getContext( "2d" )
  ctx.clearRect( 0, 0, 1000, 1000 )
  bcnvs = document.querySelector( "#branches" )
  lcnvs = document.querySelector( "#leaves" )
  ctx.drawImage( lcnvs, 0, 0 )
  ctx.drawImage( bcnvs, 0, 0 )
}
