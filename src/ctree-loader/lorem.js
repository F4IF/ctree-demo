/*
Based on code from Fatih Kadir Akın at https://github.com/f/loremjs, which
is licensed under GNU LGPL Version 3, 29 June 2007.
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
var Lorem;

//Static variables
Lorem = {
  IMAGE: 1,
  TEXT: 2,
  TYPE: {
      PARAGRAPH: 1,
      SENTENCE: 2,
      WORD: 3
  },
};

/**
 * Query strings:
 *   2p = 2 paragraphs
 *   5s = 5 sentences
 *   6w = 6 words
 *   1-6w = between 1 and 6 words
 */
Lorem.generate = function(query) {
  //Words to create lorem ipsum text.
  if (!Lorem.WORDS) {
    Lorem.WORDS = [
      "lorem", "ipsum", "dolor", "sit", "amet,", "consectetur", "adipiscing", "elit", "ut", "aliquam,", "purus", "sit", "amet", "luctus", "venenatis,", "lectus", "magna", "fringilla", "urna,", "porttitor", "rhoncus", "dolor", "purus", "non", "enim", "praesent", "elementum", "facilisis", "leo,", "vel", "fringilla", "est", "ullamcorper", "eget", "nulla", "facilisi", "etiam", "dignissim", "diam", "quis", "enim", "lobortis", "scelerisque", "fermentum", "dui", "faucibus", "in", "ornare", "quam", "viverra", "orci", "sagittis", "eu", "volutpat", "odio", "facilisis", "mauris", "sit", "amet", "massa", "vitae", "tortor", "condimentum", "lacinia", "quis", "vel", "eros", "donec", "ac", "odio", "tempor", "orci", "dapibus", "ultrices", "in", "iaculis", "nunc", "sed", "augue", "lacus,", "viverra", "vitae", "congue", "eu,", "consequat", "ac", "felis", "donec", "et", "odio", "pellentesque", "diam", "volutpat", "commodo", "sed", "egestas", "egestas", "fringilla", "phasellus", "faucibus", "scelerisque", "eleifend", "donec", "pretium", "vulputate", "sapien", "nec", "sagittis", "aliquam", "malesuada", "bibendum", "arcu", "vitae", "elementum",
      "curabitur", "vitae", "nunc", "sed", "velit", "dignissim", "sodales", "ut", "eu", "sem", "integer", "vitae", "justo", "eget", "magna", "fermentum", "iaculis", "eu", "non", "diam", "phasellus", "vestibulum", "lorem", "sed", "risus", "ultricies", "tristique", "nulla", "aliquet", "enim", "tortor,", "at", "auctor", "urna", "nunc", "id", "cursus", "metus", "aliquam", "eleifend", "mi", "in", "nulla", "posuere", "sollicitudin", "aliquam", "ultrices", "sagittis", "orci,", "a", "scelerisque", "purus", "semper", "eget", "duis", "at", "tellus", "at", "urna", "condimentum", "mattis", "pellentesque", "id", "nibh", "tortor,", "id", "aliquet", "lectus", "proin", "nibh", "nisl,", "condimentum", "id", "venenatis", "a,", "condimentum", "vitae", "sapien", "pellentesque", "habitant", "morbi", "tristique", "senectus", "et", "netus", "et", "malesuada", "fames", "ac", "turpis", "egestas", "sed", "tempus,", "urna", "et", "pharetra", "pharetra,", "massa", "massa", "ultricies", "mi,", "quis", "hendrerit", "dolor", "magna", "eget", "est", "lorem", "ipsum", "dolor", "sit", "amet,", "consectetur", "adipiscing", "elit", "pellentesque", "habitant", "morbi", "tristique", "senectus", "et", "netus", "et", "malesuada", "fames", "ac", "turpis", "egestas", "integer", "eget", "aliquet", "nibh", "praesent", "tristique", "magna", "sit", "amet", "purus", "gravida", "quis", "blandit", "turpis", "cursus", "in", "hac", "habitasse", "platea", "dictumst", "quisque", "sagittis,", "purus", "sit", "amet", "volutpat", "consequat,", "mauris", "nunc", "congue", "nisi,", "vitae", "suscipit", "tellus", "mauris", "a", "diam",
      "maecenas", "sed", "enim", "ut", "sem", "viverra", "aliquet", "eget", "sit", "amet", "tellus", "cras", "adipiscing", "enim", "eu", "turpis", "egestas", "pretium", "aenean", "pharetra,", "magna", "ac", "placerat", "vestibulum,", "lectus", "mauris", "ultrices", "eros,", "in", "cursus", "turpis", "massa", "tincidunt", "dui", "ut", "ornare", "lectus", "sit", "amet", "est", "placerat", "in", "egestas", "erat", "imperdiet", "sed", "euismod", "nisi", "porta", "lorem", "mollis", "aliquam", "ut", "porttitor", "leo", "a", "diam", "sollicitudin", "tempor", "id", "eu", "nisl", "nunc", "mi", "ipsum,", "faucibus", "vitae", "aliquet", "nec,", "ullamcorper", "sit", "amet", "risus", "nullam", "eget", "felis", "eget", "nunc", "lobortis", "mattis", "aliquam", "faucibus", "purus", "in", "massa", "tempor", "nec", "feugiat", "nisl", "pretium", "fusce", "id", "velit", "ut", "tortor", "pretium", "viverra", "suspendisse", "potenti", "nullam", "ac", "tortor", "vitae", "purus", "faucibus", "ornare", "suspendisse", "sed", "nisi", "lacus,", "sed", "viverra", "tellus", "in", "hac", "habitasse", "platea", "dictumst", "vestibulum", "rhoncus", "est", "pellentesque", "elit", "ullamcorper", "dignissim", "cras", "tincidunt", "lobortis", "feugiat", "vivamus", "at", "augue", "eget", "arcu", "dictum", "varius", "duis", "at", "consectetur", "lorem",
      "donec", "massa", "sapien,", "faucibus", "et", "molestie", "ac,", "feugiat", "sed", "lectus", "vestibulum", "mattis", "ullamcorper", "velit", "sed", "ullamcorper", "morbi", "tincidunt", "ornare", "massa,", "eget", "egestas", "purus", "viverra", "accumsan", "in", "nisl", "nisi,", "scelerisque", "eu", "ultrices", "vitae,", "auctor", "eu", "augue", "ut", "lectus", "arcu,", "bibendum", "at", "varius", "vel,", "pharetra", "vel", "turpis", "nunc", "eget", "lorem", "dolor,", "sed", "viverra", "ipsum", "nunc", "aliquet", "bibendum", "enim,", "facilisis", "gravida", "neque", "convallis", "a", "cras", "semper", "auctor", "neque,", "vitae", "tempus", "quam", "pellentesque", "nec", "nam", "aliquam", "sem", "et", "tortor", "consequat", "id", "porta", "nibh", "venenatis", "cras", "sed", "felis", "eget", "velit", "aliquet", "sagittis", "id", "consectetur", "purus", "ut", "faucibus", "pulvinar", "elementum", "integer", "enim", "neque,", "volutpat", "ac", "tincidunt", "vitae,", "semper", "quis", "lectus", "nulla", "at", "volutpat", "diam", "ut", "venenatis", "tellus", "in", "metus", "vulputate", "eu", "scelerisque", "felis", "imperdiet", "proin", "fermentum", "leo", "vel", "orci", "porta", "non", "pulvinar", "neque", "laoreet", "suspendisse", "interdum", "consectetur", "libero,", "id", "faucibus", "nisl", "tincidunt", "eget", "nullam", "non", "nisi", "est,", "sit", "amet", "facilisis", "magna",
      "etiam", "tempor,", "orci", "eu", "lobortis", "elementum,", "nibh", "tellus", "molestie", "nunc,", "non", "blandit", "massa", "enim", "nec", "dui", "nunc", "mattis", "enim", "ut", "tellus", "elementum", "sagittis", "vitae", "et", "leo", "duis", "ut", "diam", "quam", "nulla", "porttitor", "massa", "id", "neque", "aliquam", "vestibulum", "morbi", "blandit", "cursus", "risus,", "at", "ultrices", "mi", "tempus", "imperdiet", "nulla", "malesuada", "pellentesque", "elit", "eget", "gravida", "cum", "sociis", "natoque", "penatibus", "et", "magnis", "dis", "parturient", "montes,", "nascetur", "ridiculus", "mus", "mauris", "vitae", "ultricies", "leo", "integer", "malesuada", "nunc", "vel", "risus", "commodo", "viverra", "maecenas", "accumsan,", "lacus", "vel", "facilisis", "volutpat,", "est", "velit", "egestas", "dui,", "id", "ornare", "arcu", "odio", "ut", "sem", "nulla", "pharetra", "diam", "sit", "amet", "nisl", "suscipit", "adipiscing", "bibendum", "est", "ultricies", "integer", "quis", "auctor", "elit",
      "sed", "vulputate", "mi", "sit", "amet", "mauris", "commodo", "quis", "imperdiet", "massa", "tincidunt", "nunc", "pulvinar", "sapien", "et", "ligula", "ullamcorper", "malesuada", "proin", "libero", "nunc,", "consequat", "interdum", "varius", "sit", "amet,", "mattis", "vulputate", "enim", "nulla", "aliquet", "porttitor", "lacus,", "luctus", "accumsan", "tortor", "posuere", "ac", "ut", "consequat", "semper", "viverra", "nam", "libero", "justo,", "laoreet", "sit", "amet", "cursus", "sit", "amet,", "dictum", "sit", "amet", "justo", "donec", "enim", "diam,", "vulputate", "ut", "pharetra", "sit", "amet,", "aliquam", "id", "diam", "maecenas", "ultricies", "mi", "eget", "mauris", "pharetra", "et", "ultrices", "neque", "ornare", "aenean", "euismod", "elementum", "nisi,", "quis", "eleifend", "quam", "adipiscing", "vitae", "proin", "sagittis,", "nisl", "rhoncus", "mattis", "rhoncus,", "urna", "neque", "viverra", "justo,", "nec", "ultrices", "dui", "sapien", "eget", "mi", "proin", "sed", "libero", "enim,", "sed", "faucibus", "turpis", "in", "eu", "mi", "bibendum", "neque", "egestas", "congue", "quisque", "egestas", "diam", "in", "arcu", "cursus", "euismod", "quis", "viverra", "nibh", "cras", "pulvinar", "mattis", "nunc,", "sed", "blandit", "libero", "volutpat", "sed", "cras", "ornare", "arcu", "dui", "vivamus", "arcu", "felis,", "bibendum", "ut", "tristique", "et,", "egestas", "quis", "ipsum", "suspendisse", "ultrices", "gravida", "dictum",
      "fusce", "ut", "placerat", "orci", "nulla", "pellentesque", "dignissim", "enim,", "sit", "amet", "venenatis", "urna", "cursus", "eget", "nunc", "scelerisque", "viverra", "mauris,", "in", "aliquam", "sem", "fringilla", "ut", "morbi", "tincidunt", "augue", "interdum", "velit", "euismod", "in", "pellentesque", "massa", "placerat", "duis", "ultricies", "lacus", "sed", "turpis", "tincidunt", "id", "aliquet", "risus", "feugiat", "in", "ante", "metus,", "dictum", "at", "tempor", "commodo,", "ullamcorper", "a", "lacus", "vestibulum", "sed", "arcu", "non", "odio", "euismod", "lacinia", "at", "quis", "risus", "sed", "vulputate", "odio", "ut", "enim", "blandit", "volutpat", "maecenas", "volutpat", "blandit", "aliquam", "etiam", "erat", "velit,", "scelerisque", "in", "dictum", "non,", "consectetur", "a", "erat", "nam", "at", "lectus", "urna", "duis", "convallis", "convallis", "tellus,", "id", "interdum", "velit", "laoreet", "id", "donec", "ultrices", "tincidunt", "arcu,", "non", "sodales", "neque", "sodales", "ut", "etiam", "sit", "amet", "nisl", "purus,", "in", "mollis", "nunc",
      "sed", "id", "semper", "risus", "in", "hendrerit", "gravida", "rutrum", "quisque", "non", "tellus", "orci,", "ac", "auctor", "augue", "mauris", "augue", "neque,", "gravida", "in", "fermentum", "et,", "sollicitudin", "ac", "orci", "phasellus", "egestas", "tellus", "rutrum", "tellus", "pellentesque", "eu", "tincidunt", "tortor", "aliquam", "nulla", "facilisi", "cras", "fermentum,", "odio", "eu", "feugiat", "pretium,", "nibh", "ipsum", "consequat", "nisl,", "vel", "pretium", "lectus", "quam", "id", "leo", "in", "vitae", "turpis", "massa", "sed", "elementum", "tempus", "egestas", "sed", "sed", "risus", "pretium", "quam", "vulputate", "dignissim", "suspendisse", "in", "est", "ante", "in", "nibh", "mauris,", "cursus", "mattis", "molestie", "a,", "iaculis", "at", "erat",
      "pellentesque", "adipiscing", "commodo", "elit,", "at", "imperdiet", "dui", "accumsan", "sit", "amet", "nulla", "facilisi", "morbi", "tempus", "iaculis", "urna,", "id", "volutpat", "lacus", "laoreet", "non", "curabitur", "gravida", "arcu", "ac", "tortor", "dignissim", "convallis", "aenean", "et", "tortor", "at", "risus", "viverra", "adipiscing", "at", "in", "tellus", "integer", "feugiat", "scelerisque", "varius", "morbi", "enim", "nunc,", "faucibus", "a", "pellentesque", "sit", "amet,", "porttitor", "eget", "dolor", "morbi", "non", "arcu", "risus,", "quis", "varius", "quam", "quisque", "id", "diam", "vel", "quam", "elementum", "pulvinar", "etiam", "non", "quam", "lacus", "suspendisse", "faucibus", "interdum", "posuere", "lorem", "ipsum", "dolor", "sit", "amet,", "consectetur", "adipiscing", "elit", "duis", "tristique", "sollicitudin", "nibh", "sit", "amet", "commodo", "nulla", "facilisi",
      "nullam", "vehicula", "ipsum", "a", "arcu", "cursus", "vitae", "congue", "mauris", "rhoncus", "aenean", "vel", "elit", "scelerisque", "mauris", "pellentesque", "pulvinar", "pellentesque", "habitant", "morbi", "tristique", "senectus", "et", "netus", "et", "malesuada", "fames", "ac", "turpis", "egestas", "maecenas", "pharetra", "convallis", "posuere", "morbi", "leo", "urna,", "molestie", "at", "elementum", "eu,", "facilisis", "sed", "odio", "morbi", "quis", "commodo", "odio", "aenean", "sed", "adipiscing", "diam", "donec", "adipiscing", "tristique", "risus", "nec", "feugiat", "in", "fermentum", "posuere", "urna", "nec", "tincidunt", "praesent", "semper", "feugiat", "nibh", "sed", "pulvinar", "proin", "gravida", "hendrerit", "lectus", "a", "molestie"
    ];
  }

  var text = [];

  if (/\d+-\d+[psw]/.test(query)) {
    var range = query.replace(/[a-z]/,'').split("-");
    var count = Math.floor(Math.random() * parseInt(range[1])) + parseInt(range[0]);
  } else {
    var count = parseInt(query);
  }

  if (/\d+p/.test(query)) {
    var type = Lorem.TYPE.PARAGRAPH;
  } else if (/\d+s/.test(query)) {
    var type = Lorem.TYPE.SENTENCE;
  } else if (/\d+w/.test(query)) {
    var type = Lorem.TYPE.WORD;
  }

  text.push(Lorem._createText(count, type));
  return text.join(' ');
};

Lorem._createText = function(count, type) {
  switch (type) {
    case Lorem.TYPE.PARAGRAPH:
      var paragraphs = new Array;
      for (var i = 0; i < count; i++) {
        var paragraphLength = Math.floor(Math.random() * 11) + 10;
        var paragraph = this.createText(paragraphLength, 2);
        paragraphs.push('<p>'+paragraph+'</p>');
      }
      return paragraphs.join('\n');
      break;

    case Lorem.TYPE.SENTENCE:
      var sentences = new Array;
      for (var i = 0; i < count; i++) {
        var sentenceLength = Math.floor(Math.random() * 6) + 5;
        var words = this._createText(sentenceLength, 3).split(' ');
        words[0] = words[0].substr(0, 1).toUpperCase() + words[0].substr(1);
        var sentence = words.join(' ');

        sentences.push(sentence);
      }
      return (sentences.join('. ') + '.').replace(/(\.\,|\,\.)/g, '.');
      break;

    case Lorem.TYPE.WORD:
      var wordIndex = Math.floor(Math.random() * (Lorem.WORDS.length - count));
      return Lorem.WORDS.slice(wordIndex, wordIndex + count).join(' ').replace(/\.|\,/g, '');
      break;
  }
};

Lorem.imageUrl = function() {
  if (!Lorem.IMAGES) {
    // TODO: add URLs or names of images in the images folder
    Lorem.IMAGES = [
      "https://upload.wikimedia.org/wikipedia/commons/c/cf/White_sand_in_Sikuai_island.JPG",
      "https://upload.wikimedia.org/wikipedia/commons/9/9e/Your_own_private_island._(15612499367).jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Dominican_Republic_Los_Haitises_birds_island.jpeg/1280px-Dominican_Republic_Los_Haitises_birds_island.jpeg",
      "https://upload.wikimedia.org/wikipedia/commons/6/65/Posts_Brook_from_Norvin_Green_State_Forest_Lower_Trail.jpg",
      "https://static.pexels.com/photos/33109/fall-autumn-red-season.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/e/e8/Orgasmic_Orange_Overload_(4107993637).jpg",
      "https://c1.staticflickr.com/6/5836/22143314240_993ffb4458_b.jpg",
      "https://static.pexels.com/photos/5313/cold-snow-nature-forest.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/7/73/Lake_Vuoksa_1.jpg",
      "http://maxpixel.freegreatpicture.com/static/photo/1x/Night-Sky-Landscape-Northern-Lights-Aurora-Borealis-1065013.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Coral_Outcrop_Flynn_Reef.jpg/1280px-Coral_Outcrop_Flynn_Reef.jpg",
      "http://maxpixel.freegreatpicture.com/static/photo/1x/Nature-Underwater-Tropical-Coral-Ocean-Fish-Reef-408904.jpg",
      "http://maxpixel.freegreatpicture.com/static/photo/1x/Sea-Reef-Coral-Reef-Fish-Aquarium-Fish-Tank-288988.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Wonderful-spring-pink-flower-bush_-_West_Virginia_-_ForestWander.jpg/1280px-Wonderful-spring-pink-flower-bush_-_West_Virginia_-_ForestWander.jpg",
      "https://static.pexels.com/photos/4825/red-love-romantic-flowers.jpg",
      "https://static.pexels.com/photos/87452/flowers-background-butterflies-beautiful-87452.jpeg",
      "https://static.pexels.com/photos/46216/sunflower-flowers-bright-yellow-46216.jpeg",
      "https://c1.staticflickr.com/1/81/234798375_5798d33876.jpg",
      "https://c1.staticflickr.com/3/2014/2429906328_12e914b417_b.jpg",
      "https://static.pexels.com/photos/54315/water-lily-flower-pond-aquatic-54315.jpeg",
      "http://www.publicdomainpictures.net/pictures/50000/velka/daisy-flowers-macro-image.jpg",
      "https://static.pexels.com/photos/60628/flower-garden-blue-sky-hokkaido-japan-60628.jpeg",
      "https://c1.staticflickr.com/5/4141/4923421757_89c10588ca_b.jpg",
      "https://static.pexels.com/photos/145939/pexels-photo-145939.jpeg",
      "https://static.pexels.com/photos/5143/cute-animals-easter-chicken.jpg",
      "https://static.pexels.com/photos/827/lawn-meadow-close-up-view-animals.jpg",
      "https://static.pexels.com/photos/750/meadow-animals-sheep-wool.jpg",
      "http://maxpixel.freegreatpicture.com/static/photo/1x/Pets-Cat-Face-Animals-Kittens-Animal-Cats-Feline-482886.jpg",
      "http://maxpixel.freegreatpicture.com/static/photo/1x/Puppy-Dogs-Animals-Rottweiler-Animal-Cute-Dog-1785760.jpg",
      "http://www.stock-free.org/images/baby-animal-photo-05032016-image-230.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/0/0e/Atlanta_Zoo_Panda.jpg",
      "https://static.pexels.com/photos/41178/africa-animal-big-carnivore-41178.jpeg",
      "https://upload.wikimedia.org/wikipedia/commons/a/a1/Lions_Family_Portrait_Masai_Mara.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/7/71/2010-kodiak-bear-1.jpg",
      "http://www.publicdomainpictures.net/pictures/20000/velka/night-in-the-city-21851292200793awk.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Bright-New-York-City.jpg/1280px-Bright-New-York-City.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/World_Italy.jpg/1280px-World_Italy.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/9/9d/Paris_la_torre_eifel.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/7/7c/Sydney_Opera_House_-_Dec_2008.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/a/af/All_Gizah_Pyramids.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/4/4b/Eurya,_1970-2007.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/c/cf/Japanese_White_Pine_bonsai_81,_October_10,_2008.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/2/22/Japanese_Black_Pine,_1936-2007.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/d/d3/Bonsai-IMG_8791.JPG",
      "https://c1.staticflickr.com/3/2022/1875177763_f03dacc1d6_b.jpg",
      "https://c1.staticflickr.com/9/8524/8683226513_688d8e9507_b.jpg",
      "https://c1.staticflickr.com/7/6095/6242369676_716fec0713_b.jpg",
    ];
  }
  return Lorem.IMAGES[Math.floor(Math.random() * Lorem.IMAGES.length)];
};

Lorem.avatarUrl = function() {
  if (!Lorem.AVATARS) {
    // TODO: add URLs or names of avatar images in the images folder
    Lorem.AVATARS = [
      "avatar01.jpg",
      "avatar02.jpg",
      "avatar03.jpg",
      "avatar04.jpg",
      "avatar05.jpg",
      "avatar06.jpg",
      "avatar07.jpg",
      "avatar08.jpg",
      "avatar09.jpg",
      "avatar10.jpg",
      "avatar11.jpg",
      "avatar12.jpg",
      "avatar13.jpg",
      "avatar14.jpg",
      "avatar15.jpg",
      "avatar16.jpg",
      "avatar17.jpg",
      "avatar18.jpg",
      "avatar19.jpg",
      "avatar20.jpg",
      "avatar21.jpg",
      "avatar22.jpg",
      "avatar23.jpg",
      "avatar24.jpg",
      "avatar25.jpg",
      "avatar26.jpg",
      "avatar27.jpg",
      "avatar28.jpg",
      "avatar29.jpg",
      "avatar30.jpg",
      "avatar31.jpg",
      "avatar32.jpg",
    ];
  }
  return Lorem.AVATARS[Math.floor(Math.random() * Lorem.AVATARS.length)];
};
