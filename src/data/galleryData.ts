import img1 from "../assets/gallery/gallery_image_1.png";
import img2 from "../assets/gallery/gallery_image_2.png";
import img3 from "../assets/gallery/gallery_image_3.png";
import img4 from "../assets/gallery/gallery_image_4.png";

export interface GalleryItem {
    id: number;
    title: string;
    category: string;
    image: string;
}

export const galleryItems: GalleryItem[] = [
    {
        id: 1,
        title: "Futuristic Architecture",
        category: "Architecture",
        image: img1,
    },
    {
        id: 2,
        title: "Abstract Iridescence",
        category: "3D Art",
        image: img2,
    },
    {
        id: 3,
        title: "Neon Cityscape",
        category: "Photography",
        image: img3,
    },
    {
        id: 4,
        title: "Carbon Fiber Detail",
        category: "Automotive",
        image: img4,
    },
];
