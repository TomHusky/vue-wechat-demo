const state = {
  windowWidth: null,
  windowHeight: null,
  imgWindow: {
    width: 0,
    height: 0,
    showImgWindow: false,
    src: null
  },
  network: true,
  headMenu: {
    visibleIng: false,
    visible: false,
    clientX: 0,
    clienty: 0,
    self: true,
    type: 1, //类型 1 好友 2 群聊
  },
  // 系统图标
  systemFileIcon:{
    ".html": "data:image/png;base64,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",
    ".svg": "data:image/png;base64,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",
    ".gif": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEHklEQVR42u2WW09cVRiG+xfk1AujQTTxnLQmesFUWgodRFONjYdEY6rRC0+tMdbWFstxzgwwwAxzYmBmOKgtxQujf8GYtDGRBO1FDYkOMxtIppJQ5gC8ft/es/bswYGyWu90J2/2ziST51nfWutba9++/58yz9TUFDiTk5OYmJhAPB5HLBZHNBZDNBrF+Pg4xsbGEImMYTQSQXh0FKFwGKFQGMFgiH9Le0OhA3clsLm5+Y9sGLOxPRvY2trC9PQ0FhYWWCjt9XrvTIJHzsB8Po8cJyeSQ1Ykq70zWZGsKsECq6uruHHjdwSCwTuT4LKXE9Dh/L2LQDqdxsrKCn67fh1+fyA9ICvBc84CuZ0Esloy2fICy8vLUBQFiUQCc3NzJOFPSwnwgtMFdiq/AbxdwO12l8QzNAQpAV7tqkBuD+XPFAX4O0UjT6ZEUlSNFXgGByUFaKsJgaxx5AJepvxCYN2Y9Qytow0MeCQFeJ/zVhPgR75d2nMen13CwZklPHNJ0QX6BzxyAtxkNIG8mttBryb+UrfeNXo/fVlB/TcKDn+l4FZBoK9/QE6AOxw3F1Hu3eCPUhgu0kDgpqkUWidSuoC7v19OgNurWoHszlPA4Ceo3E/NKPj5z5sq/Jc/bqJlMoXj8RRORIsCvX19cgLc27kCYpGVm+cDhXk2fa2gcVqBmcAvEPhlAr82nsSbkWRRwC0pwAcL72mxsgX4MQLf+8ks7ml1ofbUFXWem6ncz1O5X4ql8CqB3yDwyXAS7wUXdQFXr1tSIBQuqQCX+8krS7jv9CwqWp2oeM6BihYbHv7gEl6kUZvb59B06iqOd/yKd0NJvB9YxOkRIZCH09UrJ8BHql4BykGa5/tpxBrYjgqzFZXHLJQePPSKH/Unv0Pjhz+qEicuzuNT3yLODidUAe6mDpdLToBOMU0go01B7cczGphGXWnWwJXN3ahq6kTV0Q7Utjhgevt7XeL1tnl0eEjg1roqYHdKCvgDAeRJQHQ0DWw1gLtUcFVjO6qPXET14TY80OIskXjr/DzWCgI2h1NOYMTvLxFQy93co4HVURO4kcBHviT4BdQ0nEfNs+dQZ7YbJK4VBewOOQHfyDYBQ7mrdHBbAfwFag6dxX7T59hffwZ1x6wwvfMDjn70ky5gtdklBXwj6vbhXs4pllsDVzdcKIDPoYbBpjME/0xPXbMFh0hCCFhsNjkBr8+nCvAq5mjlbisptzbqUrAxD9J0CIEeq6TAsNdbIrBjCLB2m7BAt8UqJzA0vJvA+p7ARoGuHoucwODQsNrBBEwGWFagu0dOgO9w/Me1uwAbBTqlBegOp9+I/4V0dHXLCfAdjq9RfJPhywSf53yk8qnGBwv3dm6v3OG4yfA+563Gq50XHM85l51HzvD2zi45gf/U8ze8xzvOi4aUpQAAAABJRU5ErkJggg==",
    ".rar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACkklEQVR42u2WyY7aQBCG55HyhMkw7PtmMJh9fSEumcNEXFBAIFlCAmwMVPzbtDHGBmomt8TSL8wBfV8V3dX98vL/8XlGoxEhw+GQBoMB9ft96vX61O31qNvtUqfToXa7Ta1Wm5qtFjWaTVIaDVKUBtXrCrXabVVSlG9fEjgejzc5uHPw5kCn04nG4zFNp1NIqZIkfU4ClQNoGAbtkb3InnQR3f7UdBHdkoDAer2mj49fVFeUz0mg7X4CDhzvdwRUVaXVakU/399JrtXVPFcC/zkE9kECuh1N9xdYLpe0WCxoNpvRZDIhWZZVlgAWnCMQ1H4X2CuQyWSuUiiViCWA1W4J7J9ov3YRwPvcrPz3XGRudmNFhWKRKWBuNSGguysXcJ/2C4GdOzvNXEcHyheYAtjn2GoP4Z7qrwU0RyCXL/AEMGRsAeMKfL3y9fvVmwLbs0A2l+cJYMJhuPiD8V2/bn9A9UIgk8vxBDBerQ7c7HV324Pgl+qFQDqb5QlgtqMDN2Dttu1+cFG9I5BhCuBgwZ52IAEr/hFcCKTSGaaA0vB0QL+OL1y/gdsCBiVTaZ4AjlSnAx6oL9inchFM00QqxROo1eu2gPYIfB++3e4sgXiSKSDXamSYArtA6HPwzVkglkjyBKqy/EDABj+COwLxBE+gUvUKaJfcA3vgQiAaizMFKlVr+wjYQ+g5Gw9cCERiMZ6AVKlYAtsnoH5VewXCUaZAWZKeE7gDdgu8RaI8gVL5nsDuKbBbIBSO8ASKpbI1wQSMA/QVeAvzBHCHww83XwC7BV7ZAuYdzrkR/4X8CL3xBHCHwzUKNxlcJnCe40jFqYaDBbMd4xUTDkMG+xxbDasdCw7/OdqOygH//hriCfxTzx+qN2JiulBqkgAAAABJRU5ErkJggg==",
    ".jpg": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEHklEQVR42u2WW09cVRiG+xfk1AujQTTxnLQmesFUWgodRFONjYdEY6rRC0+tMdbWFstxzgwwwAxzYmBmOKgtxQujf8GYtDGRBO1FDYkOMxtIppJQ5gC8ft/es/bswYGyWu90J2/2ziST51nfWutba9++/58yz9TUFDiTk5OYmJhAPB5HLBZHNBZDNBrF+Pg4xsbGEImMYTQSQXh0FKFwGKFQGMFgiH9Le0OhA3clsLm5+Y9sGLOxPRvY2trC9PQ0FhYWWCjt9XrvTIJHzsB8Po8cJyeSQ1Ykq70zWZGsKsECq6uruHHjdwSCwTuT4LKXE9Dh/L2LQDqdxsrKCn67fh1+fyA9ICvBc84CuZ0Esloy2fICy8vLUBQFiUQCc3NzJOFPSwnwgtMFdiq/AbxdwO12l8QzNAQpAV7tqkBuD+XPFAX4O0UjT6ZEUlSNFXgGByUFaKsJgaxx5AJepvxCYN2Y9Qytow0MeCQFeJ/zVhPgR75d2nMen13CwZklPHNJ0QX6BzxyAtxkNIG8mttBryb+UrfeNXo/fVlB/TcKDn+l4FZBoK9/QE6AOxw3F1Hu3eCPUhgu0kDgpqkUWidSuoC7v19OgNurWoHszlPA4Ceo3E/NKPj5z5sq/Jc/bqJlMoXj8RRORIsCvX19cgLc27kCYpGVm+cDhXk2fa2gcVqBmcAvEPhlAr82nsSbkWRRwC0pwAcL72mxsgX4MQLf+8ks7ml1ofbUFXWem6ncz1O5X4ql8CqB3yDwyXAS7wUXdQFXr1tSIBQuqQCX+8krS7jv9CwqWp2oeM6BihYbHv7gEl6kUZvb59B06iqOd/yKd0NJvB9YxOkRIZCH09UrJ8BHql4BykGa5/tpxBrYjgqzFZXHLJQePPSKH/Unv0Pjhz+qEicuzuNT3yLODidUAe6mDpdLToBOMU0go01B7cczGphGXWnWwJXN3ahq6kTV0Q7Utjhgevt7XeL1tnl0eEjg1roqYHdKCvgDAeRJQHQ0DWw1gLtUcFVjO6qPXET14TY80OIskXjr/DzWCgI2h1NOYMTvLxFQy93co4HVURO4kcBHviT4BdQ0nEfNs+dQZ7YbJK4VBewOOQHfyDYBQ7mrdHBbAfwFag6dxX7T59hffwZ1x6wwvfMDjn70ky5gtdklBXwj6vbhXs4pllsDVzdcKIDPoYbBpjME/0xPXbMFh0hCCFhsNjkBr8+nCvAq5mjlbisptzbqUrAxD9J0CIEeq6TAsNdbIrBjCLB2m7BAt8UqJzA0vJvA+p7ARoGuHoucwODQsNrBBEwGWFagu0dOgO9w/Me1uwAbBTqlBegOp9+I/4V0dHXLCfAdjq9RfJPhywSf53yk8qnGBwv3dm6v3OG4yfA+563Gq50XHM85l51HzvD2zi45gf/U8ze8xzvOi4aUpQAAAABJRU5ErkJggg==",
    ".zip": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEGUlEQVR42u2X309bZRjH+RP8A/wPvDFxejdNjFBa4MoLY7yQjItlacQx+guVBOPQuQ1EYPUCRbIlZAFSxqxtKSFbO8rqPFCVpGgL3YC2/OrK2hvdQv3ued5TenbGDjkHtgsTT/IkTZP283m/7/P2eVtV9V9+FhcXxxcWFjA3N4doNIpwOIypqanxI39x8fcGFH9rQEFUPQoxuR5wzcuVna0Fw8fGxjA0NISBgQEMDg7C5/MhfcuE/K8WUffvWJC7Y44ZEyAw1r87sIpLPQjfDKKjowPJZFKU3W7HyNXLKCa7gewlqn5gZ1JIGBIolAVKd9voC6Y0JS4P9sLv91cEPB4Pzn5uU+DZPiBPAr+YjQrU6xL4vr8NXq+3IjA6Oore880KPMMCAeQMC8T0CfzQ14LJyUk0NTWhsbERExMTcF84pcAzvSTgf3EC16/YkEgkEI/HRUPGYjF4fmxW4JlvZYGoQYEHOgWiPocKLkkSot5WBZ7pAe4fRmBej4AbUsClhtNvgeS3K/A0C/iw/fwF3LTPLOBUwSORCAnYFHj6GxL4Gdu3a40K1B0gIMP5qLHAk/BQKEQCrQo83X04gZ05LQEFzkdNCjgE3Gq14s03Xsb09HRZoAx/vgJqOB813m9eOcNdLheCwSC9d0aBr3WRgBdbs0cW2A/no8YCHDuvnOE8ByoCDF+7SAI/HUJAekrgGXA+ag/vduOc8zg+fPcVBAIB8fph6rwCX7twVAFXWWA/fO+ojfTXi0Z0nnxdvFbBuRlzJBAxKJCXLCL2UooFgppwBjCU4dlsFiN9dQqcK0Ofy13H5sw7VNWv6hegOc6xl1JOMU614NztSgLHygJlOItsjeCf1EVszbyNjVum2M6Nt14yIHBJEdCAc7PJCRx7IgGCr1IfbFxBafMq8tEGPIqfQmH+A0rBNG5AoJ8EHGKea8GFAEFVCTB89WsRfSF2An//cQJIfYZ/ky5OQV8v8A2GYy8tO8Q814JzwzFUScAiw1fPyQLS+9j9i47l8qdUn5BAjQGBDAvYxTjVgvM+qxOwyHCu7Qnkb9eRQIuAY6nNqECvIqAB5/3enwDBV74igWuUwHskcFrAseTERlivAN1gOPbSsk3Mcy24LGBRJ8DwlS+FQJEab/fPjwUcSQfW9QrkhEBPWcCnCeeGY6gqAYavdAqB/GwNCTQLOJJ2gwJpFmgV00wLzg2nTsAsw4XAOAmYsbv4kYAjYcN6SK9A1CxirwhowHm/h4eHxa2Ix3JXV5cMv3eWBDwkUEsCVgFHopUEqo0IdB+48r1u539DDOeJ2NlZht/7Qghs33gNu3GrgCPRgqxeAb7D8SVir3iaVYoGy2bEJNeMCW63W6yc4e3t7eKocbev71WoRqyc4dmb1TtV/z9PPY8BrS7agB2rpZIAAAAASUVORK5CYII=",
    ".xlsx": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABPklEQVR42mNgGIygrblpU2V5yX9ycVV5SQJFDgAZ8uvXL7IwVRxBqQNOnjxBmSModQCIpsgR1HAARY6glgPIdgQ1HUCUI/hr7BMEahz/k4MXnd6CYtnKFcvwZlGsDiDXchgmJXQGvwP0eiL/f/z+5T8ILDu3Ay7uM7fwPwyA2DQNgY59C+CWgRwEErv8/A6Yv/XaEfpEwaP3L+ChkLW2E8wGhYx8iy9WByguToNjEN/4SCMck+WA6KW18FCAOaZy2xScaYDqDgDhI/cvwB0BigK65wJkB4BCAZ8DCIUIyQ4ABTcs3mFRAEqcdHEAclYEOQSWCJFzBU2jAJTV0IMdFgqgaMHmAIkYczgG8YW9dOCYJAcgp36Qz7GJg9g0c8DIrAuoWR2T5QBqNkhGHTDqgOHhAEo7p7gwyNxB1xMHAIGPn+U+0ezfAAAAAElFTkSuQmCC",
    ".xls": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABGElEQVR42mNgGIygrblpU2V5yX9ycVV5SQJFDgAZ8uvXL7IwVRxBqQNOnjxBmSModQCIpsgR1HAARY6glgPIdgQ1HUCUIwRqHP9TgpEtW7liGd4sSnMHEAodvA4gNbiHpwPQg3fR6S3/zz26/l+u2Qcj2GnigPTVbWD2+cc3/ttMSQGzJRs8UCwHqUF3gOLiNDgG8Y2PNMIxyVEAsgBk+b3XT+COgOHW3XOxRgFVHQDC4YsqMRzhNjOHPokQOc5xhQS6A9Dl0EOEaAdgS3DojjDoi6adA9AtR3YEKGEiJ0S6lgPIFmIrCSVizOEYxBf20oFjuhREA+4AqkTBgFdGA+YAajZIRh0w6oDh4QBKO6e4MMjcQdcTBwDb//MsCQ4QFwAAAABJRU5ErkJggg==",
    ".java": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACm0lEQVR42u2WSW/aUBDHc+hX7KmnXnrrpR+ghMVgjAFD2Aw2BgQYNcdG6TFKj43SQ1QlqUQkFBbRumFRqqpsmnoeomK1GYrUQ2vpL4P9nv+/NzNvOTj4f625SqUSFIuoIhQKBcij8nnI5XKgaRpkUdksqGoWFFWFTEaBdCYDcjoNspwGvVJpOxyOJzsDoPFkMoHxTONNGv/WyBT2KZfL0Gq1QNf1bztDzABGoxEMUcOpBisaTjUYwk9TCIEA/X4fGo0GQhg7QWDY/wSg2+2CYRhQq9XMNJbpEAiAoZ833wgwWAVot9ssDRiFavUOtFy+TgLAgmMAluabAURRXJAUiQIZYLDRlK6wFKEB4HTbJ0AoLNEAcK7vEyAYCtMAVHORoRj0bm73DKDSANpvTy3fi8EQDUBRlO3NT97ZAgSCQRoAru3bmN8rOagrGjxcXELH1EYAkQiAG8s25l9OTtndyhwlBEQaAO5qdgCfnr9g96unz2zb+oUADSAly7YfxdD/6PTg5uUraFaOLdv6/AIRICVvVQPG2XvoXX8206DZAPhpAMlkau2HcMRY8d/rjYVnqMf76bOmfrxSE16epwEkLACa+hsGMS+MBL7DNl/N38bZ+UI/zusjAiSSliGtenioSXEW+tm9b66GGIV1M4IMEIsnbHOPI8ZUPJqajX6TPHSA+Po1//qWmWHh1aQY3HE8E6ZlPk3L/dwcRwM4isXWmqMpjr5z8XGhBvD/w4dLFhFMwTKEy+OhAUSPYta7nxkBFBpi0aGmxXjOQJfbu9xEgEg0utfzwKHLTQOQIpG9Ajicrr8L8PrQSQMISxI7xwVDIXaYwO1UME+3uKvhxsILAvh4PxPn49k8d3NeJpeHA6eZcww7jhxFBvinrl/MrkE/0tQAWAAAAABJRU5ErkJggg==",
    ".jpeg": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEHklEQVR42u2WW09cVRiG+xfk1AujQTTxnLQmesFUWgodRFONjYdEY6rRC0+tMdbWFstxzgwwwAxzYmBmOKgtxQujf8GYtDGRBO1FDYkOMxtIppJQ5gC8ft/es/bswYGyWu90J2/2ziST51nfWutba9++/58yz9TUFDiTk5OYmJhAPB5HLBZHNBZDNBrF+Pg4xsbGEImMYTQSQXh0FKFwGKFQGMFgiH9Le0OhA3clsLm5+Y9sGLOxPRvY2trC9PQ0FhYWWCjt9XrvTIJHzsB8Po8cJyeSQ1Ykq70zWZGsKsECq6uruHHjdwSCwTuT4LKXE9Dh/L2LQDqdxsrKCn67fh1+fyA9ICvBc84CuZ0Esloy2fICy8vLUBQFiUQCc3NzJOFPSwnwgtMFdiq/AbxdwO12l8QzNAQpAV7tqkBuD+XPFAX4O0UjT6ZEUlSNFXgGByUFaKsJgaxx5AJepvxCYN2Y9Qytow0MeCQFeJ/zVhPgR75d2nMen13CwZklPHNJ0QX6BzxyAtxkNIG8mttBryb+UrfeNXo/fVlB/TcKDn+l4FZBoK9/QE6AOxw3F1Hu3eCPUhgu0kDgpqkUWidSuoC7v19OgNurWoHszlPA4Ceo3E/NKPj5z5sq/Jc/bqJlMoXj8RRORIsCvX19cgLc27kCYpGVm+cDhXk2fa2gcVqBmcAvEPhlAr82nsSbkWRRwC0pwAcL72mxsgX4MQLf+8ks7ml1ofbUFXWem6ncz1O5X4ql8CqB3yDwyXAS7wUXdQFXr1tSIBQuqQCX+8krS7jv9CwqWp2oeM6BihYbHv7gEl6kUZvb59B06iqOd/yKd0NJvB9YxOkRIZCH09UrJ8BHql4BykGa5/tpxBrYjgqzFZXHLJQePPSKH/Unv0Pjhz+qEicuzuNT3yLODidUAe6mDpdLToBOMU0go01B7cczGphGXWnWwJXN3ahq6kTV0Q7Utjhgevt7XeL1tnl0eEjg1roqYHdKCvgDAeRJQHQ0DWw1gLtUcFVjO6qPXET14TY80OIskXjr/DzWCgI2h1NOYMTvLxFQy93co4HVURO4kcBHviT4BdQ0nEfNs+dQZ7YbJK4VBewOOQHfyDYBQ7mrdHBbAfwFag6dxX7T59hffwZ1x6wwvfMDjn70ky5gtdklBXwj6vbhXs4pllsDVzdcKIDPoYbBpjME/0xPXbMFh0hCCFhsNjkBr8+nCvAq5mjlbisptzbqUrAxD9J0CIEeq6TAsNdbIrBjCLB2m7BAt8UqJzA0vJvA+p7ARoGuHoucwODQsNrBBEwGWFagu0dOgO9w/Me1uwAbBTqlBegOp9+I/4V0dHXLCfAdjq9RfJPhywSf53yk8qnGBwv3dm6v3OG4yfA+563Gq50XHM85l51HzvD2zi45gf/U8ze8xzvOi4aUpQAAAABJRU5ErkJggg==",
    ".json": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACZklEQVR42u2WS2/aQBDHc+i36sfox+gH6K2Eh7ExfhICGDAvAc69hxw5plIqNVJzyMGRHEGRKypRV61UXpp6HFHV9jrNuEg5tCv9JbyLd34zs7Pjo6P/gzFGoxEMh6ghDAYD6KP6fej1etDtdqGD6nTANDvQNk1otdrQbLXAaDbBMJpgnZ25mUzmWWoANLzb7WC71zZJ21/a+MJ3xuMxzOdzsCzrc2qIPcBms4E1an2vVUzre63W8MMXQiCA53kwm80QYpEKAsP+NwDL5RIWiwU4juOncUyHQAAM/e/GEwFWcQDXdYM0YBRs+xa6vf6UBIAHLgB40HgygCRJIWl6BcgAq0SjdKmaTgPAcjskgKJqNACs9UMCyIpKAzD9S+ZpAUw2gH1rweW7V+DcvQnN4/PF25ex+b0kWaEBtNvt2CazjxM4P38Ok8mL4Hd0Dedx3f10GXu3LMs0ALzbWd6jAcdhe4nzuG7bVhxAIgJgY0ky8CcA1rpYlmgA2NWSUnBz02IC4HxSCkpimQbQMIzQBt++L+H9VT4wEM1/FPDDtQpfvGlojS+JRICGwfQOT/pD5baHjEaJL5VoAPV6I7SB93UK175nj4kA/i+6VhQEGkAtAoDC3D7mDLAOIVfkiQC1eqKHaaqADFA9raUuQ1aECnSA08QUpLkJ8xxHAzipVtle4p1/Eb/zEeDKrwCWcVSuUKABVE6qB+2GuTwRQK9UDgpwnMvTADRdPyhAJpt7WoDXx1kagKppwXecrCjBxwS2U9H/usWuho1FEEXghVIgjheCOs9zxUC5AgdZP+cYdvQcRQb4p8ZPLsAsS6J+ICAAAAAASUVORK5CYII=",
    ".png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEHklEQVR42u2WW09cVRiG+xfk1AujQTTxnLQmesFUWgodRFONjYdEY6rRC0+tMdbWFstxzgwwwAxzYmBmOKgtxQujf8GYtDGRBO1FDYkOMxtIppJQ5gC8ft/es/bswYGyWu90J2/2ziST51nfWutba9++/58yz9TUFDiTk5OYmJhAPB5HLBZHNBZDNBrF+Pg4xsbGEImMYTQSQXh0FKFwGKFQGMFgiH9Le0OhA3clsLm5+Y9sGLOxPRvY2trC9PQ0FhYWWCjt9XrvTIJHzsB8Po8cJyeSQ1Ykq70zWZGsKsECq6uruHHjdwSCwTuT4LKXE9Dh/L2LQDqdxsrKCn67fh1+fyA9ICvBc84CuZ0Esloy2fICy8vLUBQFiUQCc3NzJOFPSwnwgtMFdiq/AbxdwO12l8QzNAQpAV7tqkBuD+XPFAX4O0UjT6ZEUlSNFXgGByUFaKsJgaxx5AJepvxCYN2Y9Qytow0MeCQFeJ/zVhPgR75d2nMen13CwZklPHNJ0QX6BzxyAtxkNIG8mttBryb+UrfeNXo/fVlB/TcKDn+l4FZBoK9/QE6AOxw3F1Hu3eCPUhgu0kDgpqkUWidSuoC7v19OgNurWoHszlPA4Ceo3E/NKPj5z5sq/Jc/bqJlMoXj8RRORIsCvX19cgLc27kCYpGVm+cDhXk2fa2gcVqBmcAvEPhlAr82nsSbkWRRwC0pwAcL72mxsgX4MQLf+8ks7ml1ofbUFXWem6ncz1O5X4ql8CqB3yDwyXAS7wUXdQFXr1tSIBQuqQCX+8krS7jv9CwqWp2oeM6BihYbHv7gEl6kUZvb59B06iqOd/yKd0NJvB9YxOkRIZCH09UrJ8BHql4BykGa5/tpxBrYjgqzFZXHLJQePPSKH/Unv0Pjhz+qEicuzuNT3yLODidUAe6mDpdLToBOMU0go01B7cczGphGXWnWwJXN3ahq6kTV0Q7Utjhgevt7XeL1tnl0eEjg1roqYHdKCvgDAeRJQHQ0DWw1gLtUcFVjO6qPXET14TY80OIskXjr/DzWCgI2h1NOYMTvLxFQy93co4HVURO4kcBHviT4BdQ0nEfNs+dQZ7YbJK4VBewOOQHfyDYBQ7mrdHBbAfwFag6dxX7T59hffwZ1x6wwvfMDjn70ky5gtdklBXwj6vbhXs4pllsDVzdcKIDPoYbBpjME/0xPXbMFh0hCCFhsNjkBr8+nCvAq5mjlbisptzbqUrAxD9J0CIEeq6TAsNdbIrBjCLB2m7BAt8UqJzA0vJvA+p7ARoGuHoucwODQsNrBBEwGWFagu0dOgO9w/Me1uwAbBTqlBegOp9+I/4V0dHXLCfAdjq9RfJPhywSf53yk8qnGBwv3dm6v3OG4yfA+563Gq50XHM85l51HzvD2zi45gf/U8ze8xzvOi4aUpQAAAABJRU5ErkJggg==",
    ".pptx": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABL0lEQVR42mNgGIygrblpU2V5yX9ycVV5SQJFDgAZ8uvXL7IwVRxBqQNOnjxBmSModQCIpsgR1HAARY6glgPIdgQ1HUCUI47YyiYcsZP5Tw5+tnkZimUrVyzDm0WxO4BMy2GYlNAZGg7ABv58+fT/6eo5RDng//GtYPz38lHKHPDl9tX/H84fB9Mw8Gh+H1YH/OvN+v+/PxvFASD878R28h1wOS8ULvb28E64o7A5AGQ5NgcghwRFDni5fRXZDgBhshwAshQU5DDfgwC2dEAzB6ADkINwJUJkB1AtF8BC4FZ74f/zSe54s+HbHHecmCqJkFA5gMvydyVBA+uAz5sXDJwD3rdl0K8oBgU1crAj+3wI1AVUrI7JcgA1GySjDhh1wPBwAKWdU1wYZO6g64kDANPN6wQgTg08AAAAAElFTkSuQmCC",
    ".ppt": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABDklEQVR42mNgGIygrblpU2V5yX9ycVV5SQJFDgAZ8uvXL7IwVRxBqQNOnjxBmSModQCIpsgR1HAARY6glgPIdgQ1HUCUI47YyfynBCNbtnLFMrxZlOYOIBQ6eB1AanDTxAGk+BqXA/4f3wrGfy8fpZ4D0H2O7oB/vVn///dnozgAhP+d2E66A457af1/e+YwQQchs0GWY3MAckgQ7QCY5biCmVQHgDBJDsCW0CgJAYocgIxPh1kQ5QCKcwFyFMAwSAxfCLzNcceJKUqEMMtBYuQ44F1JEH3KAVwO+Lx5wcA54H1bBv2KYlBQIwc7ss+JdsCAV0YD5gBqNkhGHTDqgOHhAEo7p7gwyNxB1xMHAEjdF3eRXTOwAAAAAElFTkSuQmCC",
    ".pdf": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADVUlEQVR42u2Wy1ITQRSG5w0UfQOfwCqeQMsXcMED6MK9K5cSIBBCIECyMZDJnQULy6oIiHhB1y58AEOAiOQ+CQSSmVyO53S6Yyc1mJkoO6bqq56ZXP6vT3fPtKLcHCbHxsYGJBIJiMcTEIvHIRaLQTQahUgkAuFwBELhMKihEKiqCsGgCuvBIKytr0NgbQ1eBQL4vageCATujyxA4e1225SWoEVtq9u2um2n0wGSz+VyEI3FWn6/fzQJ6jmFNZtNMARGF90wEGx1g503sG00dNaSCAnUajXIokQoHBlNgsrebndGFqhWq6BpGmQyGQiqqn0JGnOqQDKZtIUQKJVKUCgUIJvNQiqVormh2xKgCUcC5r2XK6CbVsDj8fSxsuoDWwI025mA0ZQw/gjoXRpSW2cSOhwdHcNB+pCTZtfLK6v2BGipjTIEZjSbLfAur9gToHVOS02Xey2VvnFF72ko6jL1BhdYtidAD5l+gWZf2XvwsadwJtEn0OgJLHm91gR2lNvwVRljfJHYl/iMfMLvCT5yPkjsSbxHdjmvkb8KUHBVuQsVROOUkRKniBSUO4w8kuNkOafIL+SE8xPJcI6RXSsC1xVOvBsmQOUW4bWJpyAfxt4+C69OPOm7r+P94viDXrjx7Xvvs3ZZ64UfITtWBajn51ygMv4QzngohVf4eQlD82P3WGArle71nK4vN9/09ZzCD60KiLILAQ2DhID26HGfAJW98uw5uy7iZ1R2nQsMhlsSoFkuxvxsYAjOXzjYmAsBUfY8tkwI72e4QG948FyEp/G/t60KFJlAN6iMAfKEEwIFvE8l13gF8lgBIXCBFZB7TuEHVgXEbD+TSi3Pdo3fp56f8jlAoWLMhcBguCUBesiIpVaVBOSlVh5YBTTeJyhybCIgh6eQrWEC9GT7l3VuVnYR/sOqwHWFE2+HCSRtPtsF9ITbkdiW2OJQ+KZyy9pLyef3s7fYJb7NruSyDhcWoB3V1IzT3ut41edjAv9jQ0ICjukZewK0h6MfXljs5bAKTE5N2xOgPZwhb8n/kUnHlD0B2sPRNop2MotLXvAsLsGCZxHcuMN1L3hg3r0Arnk3zLnmYdblAuccMjsHM85ZmHY62ZhT2annFP7S4QDl5rji+A3MThry7zIH4AAAAABJRU5ErkJggg==",
    ".exe": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABDElEQVR42u2WSwrCMBCGCyKICCKIZ1V8oKgLwbVQ8DQiXkHbA/QAfbebkVm0ZpGk07ENgh346a7fN38gxLK66eZX5ng6g8kYE7jdH9KvVMDzPCNRCuR53kqyLCuTpmm9BvAH1vxJThW8UuBiX8uIArODC9O9C5OdC+OtA6ONA8O1A4PVC/rLF/QWHwHbtpVJkoTXAAUuNiDbHOFsAQq8kQZUR0CBY3SbY+I45jVAgRcCugbYAhR4IaDavAjrCChwDIJ1DURRxGuAAi8EVJsjnC1AgWMQ+lUDqiOgRrc5JgzDdq9iWQMivHUB3eZGBVTwIAjqC1Td7VVnLsJZAk3Cfd83+yQjvwm76eZv5w15+xtTGWaChQAAAABJRU5ErkJggg==",
    ".txt": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAChElEQVR42u2WSY/aQBCF5yflFybDsIPZDQazrzd+DZfMYSIuKCCQLCEN2GwVXkMT4/EYivEtsfSEfUD1vdfV1f309P9xefr9PkG9Xo+63S51Oh1qtzvUarep1WpRs9mkRqNB9XqDavU6VWs10qtV0vUqVSo61RsNQ9X1b18C2O/3H7Sza+fUjg6HAw0GAxqPx4AyVFV9DALOUXC73dIG2khtyJKyTr+mJWUJCAAsl0t6e/tFFV1/DAKxuwFciuPdA8AwDFosFvTz9ZW0csXIcCGw5gDYfAZgnWRa7gDz+ZxmsxlNJhMajUakaZrBAkDDAWA4HLIkARRFuVI2nycWALpdJLC5I37TuiSA9+nR+e+p1PSYxoKyuRwT4LjVJIBlbzxZ3CV+CbC2a20e+2hHmSwTAPt898ASuAkA6UyWB4AhAwDh2Ob6uvMtb/emSatzAql0hgeACYfh4l4Y39Z1/KYTwBTxSwAlneYBYLz6uQTJVIoHgNmOBK4a7ezSGbtb9NK9TCCpMAFwsGBPX4p80vG3ikuARFJhAuhVkYA/S7CleCLJA8CReknA4fija3fnUhjlsUSCB1CuVE4A5q3C3sVXq7UAiMaZAFq5TNsjgB9LAIBILM4DKGmaAFjfcO3l/P0sARCN8QCKJSeA+VdehR3FJUA4EmUCFEti+/i1BKFIhAegFosCYOXl1MO1M4FgmAlQUNX7ADwK2wFeQmEeQL6g+roEgWCIB5DLF8QEW63XwuU9Tr0SCLwEeQC4w+GP718obAd4ZgMc73CXG7EP+hF44QHgDodrFG4yuEzgPMeRilMNBwtmO8YrJhyGDPY5thq6HQ2HNUfscI7i358DPIB/6vkDFCL+WOr8t90AAAAASUVORK5CYII=",
    ".sql": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACk0lEQVR42u2WzXPSQBjGe/C/8+7ds57Vk3wGQkggoRQIEL6Gj/bgwZs9OnrqwUNvOq2DGCkalGLtKF/zmiedpEGCdSEzHnRnnhlIdvf9Zd9n392dnf/No7VaLWo2oSY1Gg2qQ/U61Wo1qlarVIEqFdK0CpU1jUqlMhVLJVKLRVLVInX29weBQODWxgAIvFgsaG5rvk5zRzNTGNNut6nf71On0xluDGEDzGYzmkLTK01WNL3SZEo/TAECAOPxmHRdB4SxEQSWfRuA0WhEhmFQt9s109hmhwAAlt4dfC3AZBVgMBhYacAqnJycUrVWf88EAMNZAL8Nvh5AFMUlyUqGmAEma4OyKy0rbADYbn4CpNIyGwD2up8AUirNBqCZRcYe/H10QcMnz+lMPKDefYXe3eXp9PajFeG5/lClj4WndP7yeEsA7Rrg7Z2gZ8Cb9NmEtucQpRQbQLlcdgZvEhwyGofOHElJYgNAbfcVQGQEwMFiD+6uyflN+vLsyJlDSIpsADjV3Cb6+uqNY0T9QcFTeIevHh0e0aX+aWl8QkiyARRUdWkFzqQDCwAg3173rABegvvRD7th6DJhPCEwAhRUXz0QTyTYAPL5gq8AMZ5nA8i5AGCm3j35jwOjIKEYuX3AxeKMALm8Mxg5tyvihfkbPoBgNuj8xbH1HwHRx913Y4DsXm4pBaiGdpnF0noJ7+xy/WsKouwAe756IMJxbAC72ezWAO5tGI5G2QAyu9cAl7phGfFDqGYVHK/TEM8g9EEq4Al3IQpHGAGUTMbX+0AwHGEDkBXFV4BAKPx3AR4HQ2wAaVm27nFSKmVdJnCcCubtFqcaDhZeECjOJyxxcd7a5xEuZikc5Shk5hzLji+HmAH+qfYTyqKH+rPY8ksAAAAASUVORK5CYII=",
    ".docx": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABW0lEQVR42mNgGIygrblpU2V5yX9ycVV5SQJFDgAZ8uvXL7IwVRxBqQNOnjxBmSModQCIpsgR1HAARY6glgPIdgQ1HUCUI8Sj9iRIRO39Tw5euu8ximUrVyzDm0WxOoBcy2GYlNAZ3A5YeejZfxBI6LsEN/zx6+9gMbWUg2B+UPM5MB+kluoO6Fl7D2w4iAbxTfOP/ocBmKNqF91CUUNVB8B8d+zaexTLQGDW9kcooQRSS3UHgIIZBD5+/Q3mbz/zGu4AUFSAxK48/IwSJTAHOC59hxOTlAiR4xwEQBbCHAKLEphjaJILYJaBghwW17CogMmBaHQHaNdcxolJcgAsIcKAc+VJuM9BUYOeAKkeAqDUjh7vyFGDnk1hDiCmnCDKAchZD5byQRgWJbC0QNOSEBbUyD6FhQwshwzPonjAHEDN6pgsB1CzQTLqgFEHDA8HUNo5xYVB5g66njgA4IA31nq307AAAAAASUVORK5CYII=",
    ".doc": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA/ElEQVR42mNgGIygrblpU2V5yX9ycVV5SQJFDgAZ8uvXL7IwVRxBqQNOnjxBmSModQCIpsgR1HAARY6glgPIdgQ1HUCUIySi9v6nBCNbtnLFMrxZlOYOIBQ6eB1AanAPPwdgC9rNJ57D2TSPAnT85sO3/6rJB+nnAPRgDWg6g8LvXHUbzAY5CuQ4ZDnHpe9wYrIcALMMW2iA5GiWCNGD16n8BJjOmXYFTBvnHsGaCLVrLuPEZDsAPahBeOm+x7TNhsiWnb/zHkUMFBq4siExBRVJDsDm04OXXg/zgmjQlYR0r4wGzAHUbJCMOmDUAcPDAZR2TnFhkLmDricOACeFUqW8LglAAAAAAElFTkSuQmCC"
  },
  // 输入的搜索值
  searchText: '',
  emojis: [{
      sign: "@::tt;;@f179c32a157fc3905b3f845cdde9d786@",
      file: "100.gif",
      code: "/::)",
      title: "微笑",
      reg: /@::tt;;@f179c32a157fc3905b3f845cdde9d786@/g,
      id: "f179c32a157fc3905b3f845cdde9d786"
    },
    {
      sign: "@::tt;;@d3af995fbd5e85690dc7fad8f72e117b@",
      file: "101.gif",
      code: "/::~",
      title: "伤心",
      reg: /@::tt;;@d3af995fbd5e85690dc7fad8f72e117b@/g,
      id: "d3af995fbd5e85690dc7fad8f72e117b"
    },
    {
      sign: "@::tt;;@c973e1eff6c08a3e195f1bfbd4fe6e38@",
      file: "102.gif",
      code: "/::B",
      title: "美女",
      reg: /@::tt;;@c973e1eff6c08a3e195f1bfbd4fe6e38@/g,
      id: "c973e1eff6c08a3e195f1bfbd4fe6e38"
    },
    {
      sign: "@::tt;;@d778401b0c2d91ba64e632312e98d91a@",
      file: "103.gif",
      code: "/::|",
      title: "发呆",
      reg: /@::tt;;@d778401b0c2d91ba64e632312e98d91a@/g,
      id: "d778401b0c2d91ba64e632312e98d91a"
    },
    {
      sign: "@::tt;;@daea8564a1977711c1bf1a583efbc813@",
      file: "104.gif",
      code: "/:8-)",
      title: "墨镜",
      reg: /@::tt;;@daea8564a1977711c1bf1a583efbc813@/g,
      id: "daea8564a1977711c1bf1a583efbc813"
    },
    {
      sign: "@::tt;;@39b3c431d9e5c681f893fff06c808e6c@",
      file: "105.gif",
      code: "/::<",
      title: "哭",
      reg: /@::tt;;@39b3c431d9e5c681f893fff06c808e6c@/g,
      id: "39b3c431d9e5c681f893fff06c808e6c"
    },
    {
      sign: "@::tt;;@1417b83427473d13fb560f10f7a602b1@",
      file: "106.gif",
      code: "/::$",
      title: "羞",
      reg: /@::tt;;@1417b83427473d13fb560f10f7a602b1@/g,
      id: "1417b83427473d13fb560f10f7a602b1"
    },
    {
      sign: "@::tt;;@e46ca940d8c5752a1c3070b7c80119f3@",
      file: "107.gif",
      code: "/::X",
      title: "哑",
      reg: /@::tt;;@e46ca940d8c5752a1c3070b7c80119f3@/g,
      id: "e46ca940d8c5752a1c3070b7c80119f3"
    },
    {
      sign: "@::tt;;@1ed1f8223ccc40a2798c79ab9e97cc86@",
      file: "108.gif",
      code: "/::Z",
      title: "睡",
      reg: /@::tt;;@1ed1f8223ccc40a2798c79ab9e97cc86@/g,
      id: "1ed1f8223ccc40a2798c79ab9e97cc86"
    },
    {
      sign: "@::tt;;@6ccf78fca7ae7e9197f4f7bee43c091b@",
      file: "109.gif",
      code: "/::'(",
      title: "哭",
      reg: /@::tt;;@6ccf78fca7ae7e9197f4f7bee43c091b@/g,
      id: "6ccf78fca7ae7e9197f4f7bee43c091b"
    },
    {
      sign: "@::tt;;@7ade152d7fbb765fcc4892049a1e8968@",
      file: "110.gif",
      code: "/::-|",
      title: "囧",
      reg: /@::tt;;@7ade152d7fbb765fcc4892049a1e8968@/g,
      id: "7ade152d7fbb765fcc4892049a1e8968"
    },
    {
      sign: "@::tt;;@c557456dd4f7edbbe7f008525576b115@",
      file: "111.gif",
      code: "/::@",
      title: "怒",
      reg: /@::tt;;@c557456dd4f7edbbe7f008525576b115@/g,
      id: "c557456dd4f7edbbe7f008525576b115"
    },
    {
      sign: "@::tt;;@823b425ba05d9e2a5622dabef7c06f1a@",
      file: "112.gif",
      code: "/::P",
      title: "调皮",
      reg: /@::tt;;@823b425ba05d9e2a5622dabef7c06f1a@/g,
      id: "823b425ba05d9e2a5622dabef7c06f1a"
    },
    {
      sign: "@::tt;;@1cb4c147d8565bf1c1c59773c99f3fb7@",
      file: "113.gif",
      code: "/::D",
      title: "笑",
      reg: /@::tt;;@1cb4c147d8565bf1c1c59773c99f3fb7@/g,
      id: "1cb4c147d8565bf1c1c59773c99f3fb7"
    },
    {
      sign: "@::tt;;@40f2b9435c51445a7cb997d39f6595b1@",
      file: "114.gif",
      code: "/::O",
      title: "惊讶",
      reg: /@::tt;;@40f2b9435c51445a7cb997d39f6595b1@/g,
      id: "40f2b9435c51445a7cb997d39f6595b1"
    },
    {
      sign: "@::tt;;@cd3b0753e4e83687ee6756388e2375b3@",
      file: "115.gif",
      code: "/::(",
      title: "难过",
      reg: /@::tt;;@cd3b0753e4e83687ee6756388e2375b3@/g,
      id: "cd3b0753e4e83687ee6756388e2375b3"
    },
    {
      sign: "@::tt;;@a8f656fec90f7e095008469adc36d435@",
      file: "116.gif",
      code: "/::+",
      title: "酷",
      reg: /@::tt;;@a8f656fec90f7e095008469adc36d435@/g,
      id: "a8f656fec90f7e095008469adc36d435"
    },
    {
      sign: "@::tt;;@a6b13b7ab7e75ce00952405ac3719079@",
      file: "117.gif",
      code: "/:--b",
      title: "汗",
      reg: /@::tt;;@a6b13b7ab7e75ce00952405ac3719079@/g,
      id: "a6b13b7ab7e75ce00952405ac3719079"
    },
    {
      sign: "@::tt;;@aa456f549ef37198dd834794df369fb5@",
      file: "118.gif",
      code: "/::Q",
      title: "抓狂",
      reg: /@::tt;;@aa456f549ef37198dd834794df369fb5@/g,
      id: "aa456f549ef37198dd834794df369fb5"
    },
    {
      sign: "@::tt;;@aad1c8aed57088087adc91083e2d959e@",
      file: "119.gif",
      code: "/::T",
      title: "吐",
      reg: /@::tt;;@aad1c8aed57088087adc91083e2d959e@/g,
      id: "aad1c8aed57088087adc91083e2d959e"
    },
    {
      sign: "@::tt;;@af20e3336e30e97680d55e7d6970e73a@",
      file: "120.gif",
      code: "/:,@P",
      title: "笑",
      reg: /@::tt;;@af20e3336e30e97680d55e7d6970e73a@/g,
      id: "af20e3336e30e97680d55e7d6970e73a"
    },
    {
      sign: "@::tt;;@5a2b231cd427b824b81c8fe21b7611a7@",
      file: "121.gif",
      code: "/:,@-D",
      title: "快乐",
      reg: /@::tt;;@5a2b231cd427b824b81c8fe21b7611a7@/g,
      id: "5a2b231cd427b824b81c8fe21b7611a7"
    },
    {
      sign: "@::tt;;@134c72ddb7863f00d779dec5f91c2328@",
      file: "122.gif",
      code: "/::d",
      title: "奇",
      reg: /@::tt;;@134c72ddb7863f00d779dec5f91c2328@/g,
      id: "134c72ddb7863f00d779dec5f91c2328"
    },
    {
      sign: "@::tt;;@bb88dbaa22df021e3c2fe60a278e77f7@",
      file: "123.gif",
      code: "/:,@o",
      title: "傲",
      reg: /@::tt;;@bb88dbaa22df021e3c2fe60a278e77f7@/g,
      id: "bb88dbaa22df021e3c2fe60a278e77f7"
    },
    {
      sign: "@::tt;;@bcef0a306a9e8e261a968a6df3184dbf@",
      file: "124.gif",
      code: "/::g",
      title: "饿",
      reg: /@::tt;;@bcef0a306a9e8e261a968a6df3184dbf@/g,
      id: "bcef0a306a9e8e261a968a6df3184dbf"
    },
    {
      sign: "@::tt;;@a969ccfcc3a3d38df58239ad03264580@",
      file: "125.gif",
      code: "/:|-)",
      title: "累",
      reg: /@::tt;;@a969ccfcc3a3d38df58239ad03264580@/g,
      id: "a969ccfcc3a3d38df58239ad03264580"
    },
    {
      sign: "@::tt;;@fb621ae0139922d295053d202e91e0e2@",
      file: "126.gif",
      code: "/::!",
      title: "吓",
      reg: /@::tt;;@fb621ae0139922d295053d202e91e0e2@/g,
      id: "fb621ae0139922d295053d202e91e0e2"
    },
    {
      sign: "@::tt;;@1a6335f67cc1c053b985044087969a2b@",
      file: "127.gif",
      code: "/::L",
      title: "汗",
      reg: /@::tt;;@1a6335f67cc1c053b985044087969a2b@/g,
      id: "1a6335f67cc1c053b985044087969a2b"
    },
    {
      sign: "@::tt;;@4ff0999d86a4027d888f7ed0c9176bd9@",
      file: "128.gif",
      code: "/::>",
      title: "高兴",
      reg: /@::tt;;@4ff0999d86a4027d888f7ed0c9176bd9@/g,
      id: "4ff0999d86a4027d888f7ed0c9176bd9"
    },
    {
      sign: "@::tt;;@17c07d6a3cd57c6654c75728987b93dc@",
      file: "129.gif",
      code: "/::,@",
      title: "闲",
      reg: /@::tt;;@17c07d6a3cd57c6654c75728987b93dc@/g,
      id: "17c07d6a3cd57c6654c75728987b93dc"
    },
    {
      sign: "@::tt;;@b85b57d747a269bb09195ca14bba8d21@",
      file: "130.gif",
      code: "/:,@f",
      title: "努力",
      reg: /@::tt;;@b85b57d747a269bb09195ca14bba8d21@/g,
      id: "b85b57d747a269bb09195ca14bba8d21"
    },
    {
      sign: "@::tt;;@3df9ccfc7ec35fa45e4bdfb5b3babb4a@",
      file: "131.gif",
      code: "/::-S",
      title: "骂",
      reg: /@::tt;;@3df9ccfc7ec35fa45e4bdfb5b3babb4a@/g,
      id: "3df9ccfc7ec35fa45e4bdfb5b3babb4a"
    },
    {
      sign: "@::tt;;@0b5a0d2de31fe977a592a4260143e387@",
      file: "133.gif",
      code: "/:,@x",
      title: "秘密",
      reg: /@::tt;;@0b5a0d2de31fe977a592a4260143e387@/g,
      id: "0b5a0d2de31fe977a592a4260143e387"
    },
    {
      sign: "@::tt;;@462febe1d3f1e5875eacf0c26430bd3f@",
      file: "134.gif",
      code: "/:,@@",
      title: "乱",
      reg: /@::tt;;@462febe1d3f1e5875eacf0c26430bd3f@/g,
      id: "462febe1d3f1e5875eacf0c26430bd3f"
    },
    {
      sign: "@::tt;;@29df5d6d123a472a6232058850630d58@",
      file: "135.gif",
      code: "/::8",
      title: "疯",
      reg: /@::tt;;@29df5d6d123a472a6232058850630d58@/g,
      id: "29df5d6d123a472a6232058850630d58"
    },
    {
      sign: "@::tt;;@0bc574c5ce818a0ce53303e2a845e870@",
      file: "136.gif",
      code: "/:,@!",
      title: "哀",
      reg: /@::tt;;@0bc574c5ce818a0ce53303e2a845e870@/g,
      id: "0bc574c5ce818a0ce53303e2a845e870"
    },
    {
      sign: "@::tt;;@29d7abf636d7b27d2b1e9860c676f837@",
      file: "137.gif",
      code: "/:!!!",
      title: "鬼",
      reg: /@::tt;;@29d7abf636d7b27d2b1e9860c676f837@/g,
      id: "29d7abf636d7b27d2b1e9860c676f837"
    },
    {
      sign: "@::tt;;@48fd3166cf469c4d4ef373b440528970@",
      file: "138.gif",
      code: "/:xx",
      title: "打击",
      reg: /@::tt;;@48fd3166cf469c4d4ef373b440528970@/g,
      id: "48fd3166cf469c4d4ef373b440528970"
    },
    {
      sign: "@::tt;;@355b1fc77e01efe9df1aa7ef79fa795e@",
      file: "139.gif",
      code: "/:bye",
      title: "bye",
      reg: /@::tt;;@355b1fc77e01efe9df1aa7ef79fa795e@/g,
      id: "355b1fc77e01efe9df1aa7ef79fa795e"
    },
    {
      sign: "@::tt;;@f48a8e03a205440524e8771d2af651fc@",
      file: "142.gif",
      code: "/:handclap",
      title: "鼓掌",
      reg: /@::tt;;@f48a8e03a205440524e8771d2af651fc@/g,
      id: "f48a8e03a205440524e8771d2af651fc"
    },
    {
      sign: "@::tt;;@2f79734263557bf9ef9e5735b6e55d9e@",
      file: "145.gif",
      code: "/:<@",
      title: "什么",
      reg: /@::tt;;@2f79734263557bf9ef9e5735b6e55d9e@/g,
      id: "2f79734263557bf9ef9e5735b6e55d9e"
    },
    {
      sign: "@::tt;;@ba9de0195f8c074887fd42ff40ed7fc4@",
      file: "147.gif",
      code: "/::-O",
      title: "累",
      reg: /@::tt;;@ba9de0195f8c074887fd42ff40ed7fc4@/g,
      id: "ba9de0195f8c074887fd42ff40ed7fc4"
    },
    {
      sign: "@::tt;;@eaf33fcf7ca79fd880dc452935e56b5d@",
      file: "153.gif",
      code: "/:@x",
      title: "吓",
      reg: /@::tt;;@eaf33fcf7ca79fd880dc452935e56b5d@/g,
      id: "eaf33fcf7ca79fd880dc452935e56b5d"
    },
    {
      sign: "@::tt;;@029d557f8df103f1e7c01756edd76925@",
      file: "155.gif",
      code: "/:pd",
      title: "刀",
      reg: /@::tt;;@029d557f8df103f1e7c01756edd76925@/g,
      id: "029d557f8df103f1e7c01756edd76925"
    },
    {
      sign: "@::tt;;@d951791a7736204ba05800effe1add00@",
      file: "156.gif",
      code: "/:<W>",
      title: "水果",
      reg: /@::tt;;@d951791a7736204ba05800effe1add00@/g,
      id: "d951791a7736204ba05800effe1add00"
    },
    {
      sign: "@::tt;;@0dce1f683af61ade7464712af3d327b3@",
      file: "157.gif",
      code: "/:beer",
      title: "酒",
      reg: /@::tt;;@0dce1f683af61ade7464712af3d327b3@/g,
      id: "0dce1f683af61ade7464712af3d327b3"
    },
    {
      sign: "@::tt;;@aef9805cdbaacdd52d57f02a9d868c2e@",
      file: "158.gif",
      code: "/:basketb",
      title: "篮球",
      reg: /@::tt;;@aef9805cdbaacdd52d57f02a9d868c2e@/g,
      id: "aef9805cdbaacdd52d57f02a9d868c2e"
    },
    {
      sign: "@::tt;;@47fe0e89215badee7b4669b0e5d3876e@",
      file: "159.gif",
      code: "/:oo",
      title: "乒乓",
      reg: /@::tt;;@47fe0e89215badee7b4669b0e5d3876e@/g,
      id: "47fe0e89215badee7b4669b0e5d3876e"
    },
    {
      sign: "@::tt;;@fff800a15c2cfbce7fea77afa302d331@",
      file: "195.gif",
      code: "/:circle",
      title: "跳舞",
      reg: /@::tt;;@fff800a15c2cfbce7fea77afa302d331@/g,
      id: "fff800a15c2cfbce7fea77afa302d331"
    },
    {
      sign: "@::tt;;@21fbc6afc1969b206ca5485de3aa1bd7@",
      file: "160.gif",
      code: "/:coffee",
      title: "咖啡",
      reg: /@::tt;;@21fbc6afc1969b206ca5485de3aa1bd7@/g,
      id: "21fbc6afc1969b206ca5485de3aa1bd7"
    }
  ],
}
const mutations = {
  setSystemFileIcon(state, value) {
    state.systemFileIcon = value;
  },
  showImgWindow(state, value) {
    state.imgWindow.showImgWindow = value.showImgWindow;
    if (!value.showImgWindow) {
      state.imgWindow.src = null;
    } else {
      state.imgWindow.src = value.src;
      if (value.width) {
        state.imgWindow.width = value.width;
      }
      if (value.height) {
        state.imgWindow.height = value.height;
      }
    }
  },
  setNetwork(state, value) {
    state.network = value;
  },
  setWindowWidth(state, value) {
    state.windowWidth = value;
  },
  setwindowHeight(state, value) {
    state.windowHeight = value;
  },
  // 获取搜索值
  search(state, value) {
    state.searchText = value
  },
  setHeadMenu(state, value) {
    state.headMenu = value;
  }
}

const actions = {
  setSystemFileIcon: ({
    commit
  }, value) => {
    commit('setSystemFileIcon', value)
  },
  search: ({
    commit
  }, value) => {
    setTimeout(() => {
      commit('search', value)
    }, 100)
  },
  setNetwork: ({
    commit
  }, value) => {
    setTimeout(() => {
      commit('search', value)
    }, 100)
  },
  showImgWindow: ({
    commit
  }, value) => {
    commit('showImgWindow', value)
  },
}
const getters = {
  getHeadMenuInfo(state, params, rootState) {
    let friend = rootState.friend.friendlist.find(friend => friend.username === state.headMenu.username);
    return friend;
  },
}


export default {
  namespaced: true,
  // namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
  // 例： SET_NAME => user/SET_NAME
  state,
  mutations,
  actions,
  getters,
}