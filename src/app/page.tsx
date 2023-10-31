"use client";

import { useState } from "react";
import { images } from "@/utils/images";
import Image from "next/image";
import Link from "next/link";
import { BsFillCheckSquareFill, BsGithub, BsLinkedin } from "react-icons/bs";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

interface ImageData {
  id: number;
  title: string;
  src: string;
}

export default function Home() {
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [updatedImages, setupdatedImages] = useState<any>([]);

  const handleImageClick = (imgId: number) => {
    if (selectedImages.includes(imgId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imgId));
    } else {
      setSelectedImages([...selectedImages, imgId]);
    }
  };

  const handleDeleteSelected = () => {
    const updatedImages = images.filter(
      (img) => !selectedImages.includes(img.id)
    );

    setupdatedImages(updatedImages);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const reorderedImages = Array.from(updatedImages);
    const [movedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, movedImage);

    setupdatedImages(reorderedImages);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <main className="max-w-5xl mx-auto mt-20 bg-white p-4 border rounded-md">
        <div className="border-b pb-2 mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {selectedImages.length > 0
              ? `${selectedImages.length} File Selected`
              : "Gallery"}
          </h1>

          {selectedImages.length > 0 && (
            <button
              className="bg-red-500 text-white py-1 px-3 rounded-md"
              onClick={handleDeleteSelected}
            >
              Delete Selected
            </button>
          )}
        </div>

        <Droppable droppableId="image-gallery">
          {(provided: any) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="my__gallery grid grid-cols-5 gap-4"
            >
              {updatedImages.map((img: ImageData, index: number) => (
                <Draggable
                  key={img.id}
                  draggableId={img.id.toString()}
                  index={index}
                >
                  {(provided: any, snapshot: any) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      key={img.id}
                      className={`relative overflow-hidden border rounded-lg cursor-pointer transition-all duration-300 hover:opacity-40 ${
                        index === 0 ? "col-span-2 row-span-2" : ""
                      } `}
                      onClick={() => handleImageClick(img.id)}
                    >
                      <Image
                        src={img.src}
                        alt={img.title}
                        width={1080}
                        height={1080}
                      />

                      {selectedImages.includes(img.id) && (
                        <span className="absolute left-4 top-4 text-teal-600">
                          <BsFillCheckSquareFill />
                        </span>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>

        <div className="flex items-center justify-end mt-6 gap-4">
          <Link href="https://github.com/nadim-chowdhury">
            <BsGithub />
          </Link>
          <Link href="https://www.linkedin.com/in/nadim-chowdhury/">
            <BsLinkedin />
          </Link>
        </div>
      </main>
    </DragDropContext>
  );
}
