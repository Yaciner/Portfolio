{
  const canvas = document.getElementById(`canvas`),
  ctx = canvas.getContext(`2d`), bollen = [];
  let mouse;


  class Vector
  {
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
    add(otherVector)
    {
      this.x += otherVector.x;
      this.y += otherVector.y;
      return this;
    }

    sub(otherVector)
    {
      this.x -= otherVector.x;
      this.y -= otherVector.y;
      return this;
    }

    mult(n)
    {
      this.x *= n;
      this.y *= n;
      return this;
    }

    div(n)
    {
      this.x /= n;
      this.y /= n;
      return this;
    }
    //magnitude
    mag()
    {
      return Math.sqrt(this.x * this.x + this.y * this.y);

      //Math.pow --> tot de macht
    }

    normalize()
    {
      const mag= this.mag();
      if (mag !==0) {
        this.div(mag);
      }
      return this;
    }
    limit(max)
     {
       if(this.mag() > max)
       {
        this.normalize();
        this.mult(max);
       }
       return this;
     }


     clone()
     {
       return new Vector(this.x, this.y);
     }

     static sub(v1, v2)
     {
       const copy = v1.clone().sub(v2);
       return copy;
     }
  };


class Bol
{
  constructor(x, y)
    {
        this.location = new Vector(x, y);
        this.velocity = new Vector(Math.random() * 4 - 2 , Math.random() * 4 - 2);
        this.acceleration = new Vector(-0.001, 0.01);
        this.radius = 10;

    }


  draw()
  {
    //geen dir=mouse want vanaf je dir veranderd van coordinaten dan wordt je mouse ook aangepast waardoor het niet meer werkt
    //const dir = Vector.sub(mouse, this.location);
    // const dir = mouse.clone();
    // dir.sub(this.location);
    //dir.normalize().mult(Math.random());
  //  this.acceleration = dir;
    //this.acceleration.x = Math.random() * 20 - 20;
    //this.acceleration.y = Math.random() * 20 - 20;
    this.acceleration = Vector.sub(mouse, this.location).normalize().mult(Math.random());
    this.velocity.add(this.acceleration).limit(5);
    //this.velocity.limit(5);
    //console.log(this.velocity);
    this.location.add(this.velocity);
    if(this.location.x > canvas.width)
    {
      //this.velocity.x = -Math.abs(this.velocity.x);
      this.location.x = 0;
    }

    if(this.location.x < 0)
    {
        //this.velocity.x = Math.abs(this.velocity.x);
        this.location.x = canvas.width;
    }

    if(this.location.y > canvas.height)
    {
        //this.velocity.y = -Math.abs(this.velocity.y) ;
        this.location.y = 0;
    }

    if(this.location.y < 0)
    {
        //this.velocity.y = Math.abs(this.velocity.y);
        this.location.y = canvas.height;
    }

    ctx.beginPath();
    ctx.arc(this.location.x,this.location.y,this.radius, 0 , 2*Math.PI);
    ctx.fillStyle = `#ff0000`;
    ctx.fill();
    ctx.closePath();
  }
};

  const mousemoveHandler = event =>
  {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  };


  const init = () => {
    for(let i =0; i < 50; i++)
    {
      const bol = new Bol(Math.random()*canvas.width,Math.random()*canvas.height);
      bollen.push(bol);
    }
    mouse = new Vector(canvas.width / 2, canvas.height / 2);
    canvas.addEventListener(`mousemove`, event => mousemoveHandler(event));


    draw();
  };



  const draw = (x, y) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bollen.forEach(bol =>
      {
        bol.draw();
      });
      window.requestAnimationFrame(draw);
  };

  init();
}
