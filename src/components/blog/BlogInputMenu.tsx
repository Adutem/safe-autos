import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

interface BlogInputMenuProps {
  id: string;
  onRemoveInput: (id: string) => void;
  onMoveInput: (index: number, direction: "up" | "down") => void;
  index: number;
  blogContentLength: number;
}

const BlogInputMenu = ({
  id,
  index,
  onRemoveInput,
  onMoveInput,
  blogContentLength,
}: BlogInputMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span
          className={`w-8 h-8 rounded-md transparent-white grid place-items-center cursor-pointer hover:bg-gray-700 transition-all`}
        >
          <i
            className={`text-white flex fi fi-rr-menu-dots-vertical text-base`}
          ></i>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent style={{ zIndex: 100000005 }} className="bg-black">
        <DropdownMenuItem
          className="cursor-pointer text-gray-300 hover:text-black focus:text-black"
          onClick={() => onRemoveInput(id)}
        >
          <span className="w-36 flex justify-between cursor-pointer items-center">
            <span>Remove</span>
            <i className="flex fi fi-rr-delete text-sm rotate-180"></i>
          </span>
        </DropdownMenuItem>
        {index > 0 && (
          <DropdownMenuItem
            className="cursor-pointer text-gray-300 hover:text-black"
            onClick={() => onMoveInput(index, "up")}
          >
            <span className="w-36 flex justify-between cursor-pointer items-center">
              <span>Move Up</span>
              <i className={`flex fi fi-rr-caret-up text-sm`}></i>
            </span>
          </DropdownMenuItem>
        )}
        {blogContentLength > index + 1 && (
          <DropdownMenuItem
            className="cursor-pointer text-gray-300 hover:text-black"
            onClick={() => onMoveInput(index, "down")}
          >
            <span className="w-36 flex justify-between cursor-pointer items-center">
              <span>Move Down</span>
              <i className={`flex fi fi-rr-caret-down text-sm`}></i>
            </span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BlogInputMenu;
