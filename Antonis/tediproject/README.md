+ comment delete
+ fix zoomed images in posts


TODO: 
check author id and curr user id for POST EDIT placement



TODO:
user:
left compartment needs to get() the school
left compartment connections redirect to network

all the photos


what i can give you for post input:
id, text, one array for voice files, one array for video AND photo files
(important, videos and photos are in the same array no need to break them, voice files have diffrent layout so i need them in diffrent array)

what i need for post printing:
image, first name, last name : take this from the user instead of storing them inside the post(inside the post only store the author)

text,

like count, no need for having a list showing who liked but you need it so just return the length of the list,
comments, give me the array and i will print it as needed {
    for comments i need:
        img first name last name(as before) and text, time,
        also need to thing about delete comment
}

time,

IMPORTANT:
i need two arrays for the files,
one for voices and one for other media(AS DONE BEFORE)
the arrays are URLs NOT FILES.

I give you the files as FormData(), you make them Files() and when i need them you make them URL.createObjectURL(File()) array.
