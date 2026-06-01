import { ChevronLeft } from "lucide-react";
import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/atomic/atm.button/button.component";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/atomic/mol.dialog/dialog.component";
import getCroppedImg from "@/utils/cropImage";

interface ImageCropperDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageSrc: string | null;
  onCropComplete: (croppedImage: string) => void;
}

export const ImageCropperDialog = ({
  open,
  onOpenChange,
  imageSrc,
  onCropComplete,
}: ImageCropperDialogProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropChange = (crop: { x: number; y: number }) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const onCropCompleteHandler = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (imageSrc && croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        if (croppedImage) {
          onCropComplete(croppedImage);
          onOpenChange(false);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  if (!imageSrc) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-[#101316] text-white border-none">
        <DialogHeader className="p-4 bg-[#101316]">
          <DialogTitle className="text-lg font-medium text-white">Crop</DialogTitle>
        </DialogHeader>

        <div className="relative h-[400px] w-full bg-grayscale-x-dark">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropCompleteHandler}
          />
        </div>

        <div className="p-4 space-y-4 bg-[#101316]">
          <Button
            onClick={handleSave}
            className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-base font-medium rounded-md"
          >
            Salvar foto de perfil
          </Button>

          <div className="flex justify-center">
            <button
              onClick={() => onOpenChange(false)}
              className="flex items-center text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Voltar
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
