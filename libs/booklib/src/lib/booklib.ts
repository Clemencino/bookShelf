export interface Book {
    id: number;
    name: string;
    description: string;
    url_image: string;
    store_id: number;
}

export interface BookResponse {
    id: number;
    name: string;
    description: string;
    urlImage: string;
    storeId: number;
}

export interface CreateBook {
    name: string;
    description: string;
    urlImage: string;
}

export const books : Book[] = [
    {"id":1,"name":"Book1","description":"BlaBlaBla","url_image":"assets/bookCover1.png", "store_id":1},
    {"id":2,"name":"Book2","description":"zzzZZZZ","url_image":"assets/bookCover1.png", "store_id" :1},
    {"id":3,"name":"Book1 ","description":"testestestestesttset","url_image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSufnqUFP6hOsidGffX4MJMtBDM5bW49WQw9xllfYKRyg&s=10", "store_id":1},
    {"id":4,"name":"szas","description":"azlkndzobfeebigiuebazvznipsdnfvienofinboibfelkezkkiiiiiiiiiiiikijpininionnenfgienzignzpingezpingienzginezinfkqsnfgnezgikznigneziongieznginzigniezongieozngieonzignzigoneziongieznginezgioenzignezigneziongizeongiozengioneziogneziogneziongieozgn,eziongioezngioenzginezionfgkqlnvgzengenkdlsvnreobvdifjk c,x;eeznfkl,sdezkflsdienzkflsiokn,lzefsdinklzefsinklzafqsinkl azdqscinokl,azdqsjiokl,azdsijoklrzfijokl,arzdijqosk,lijk,leazdqijk,nleéazdjopqs,klopéazjfq,ksoeékp","url_image":"dza", "store_id":1},
    {"id":5,"name":"zaazra\"rf","description":"f\"é","url_image":"\"af\"", "store_id":1}
];