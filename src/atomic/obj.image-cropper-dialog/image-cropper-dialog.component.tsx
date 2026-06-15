import { ChevronLeft } from "lucide-react";
import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/atomic/atm.button/button.component";
import { H2 } from "@/atomic/atm.typography";
import { Dialog, DialogContent, DialogHeader } from "@/atomic/mol.dialog/dialog.component";
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
        <DialogHeader className="my-md bg-[#101316]">
          <H2>Crop</H2>
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
          <Button size="lg" fullWidth onClick={handleSave}>
            Salvar foto de perfil
          </Button>

          <div className="flex justify-center">
            <Button
              variant="link"
              className="text-white"
              size="lg"
              onClick={() => onOpenChange(false)}
              leftIcon={<ChevronLeft className="size-md" />}
            >
              Voltar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
