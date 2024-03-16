import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/base';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  boxShadow: 24,
  borderRadius: 8,
  p: 4,
};

export default function BasicModal({
  isOpen,
  onClose,
  userList,
  userId,
  handleSelectChange,
  handleSubmit,
}) {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
      >
        <Box sx={style}>
          <Box
            sx={{
              minWidth: 120,
              backgroundColor: 'white',
              minHeight: 250,
            }}
          >
            <FormControl
              fullWidth
              sx={{
                height: 200,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Select
                labelId='userEmail'
                id='userEmail'
                value={userId}
                onChange={handleSelectChange}
              >
                <MenuItem value={0}>Select Email</MenuItem>;
                {userList &&
                  userList.map((user) => {
                    return (
                      <MenuItem
                        value={user.id}
                        key={user.id}
                      >
                        {user.email}
                      </MenuItem>
                    );
                  })}
              </Select>
              <Button onClick={handleSubmit}>Submit</Button>
              <Button onClick={onClose}>Cancel</Button>
            </FormControl>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
