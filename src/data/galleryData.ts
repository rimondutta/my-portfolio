import img1 from "../assets/gallery/Rimon_Dutta_1.jpg";
import img2 from "../assets/gallery/Rimon_Dutta_2.jpg";
import img3 from "../assets/gallery/Rimon_Dutta_3.jpg";
import img4 from "../assets/gallery/Rimon_Dutta_4.jpg";

export interface GalleryItem {
    id: number;
    title: string;
    category: string;
    image: string;
}

export const galleryItems: GalleryItem[] = [
    {
        id: 1,
        title: "Rimon Dutta",
        category: "My Image",
        image: img1,
    },
    {
        id: 2,
        title: "Rimon Dutta",
        category: "My Image",
        image: img2,
    },
    {
        id: 3,
        title: "Rimon Dutta",
        category: "My Image",
        image: img3,
    },
    {
        id: 4,
        title: "Rimon Dutta",
        category: "My image",
        image: img4,
    },
];
